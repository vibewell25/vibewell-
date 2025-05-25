-- Create user_profiles table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES auth.users(id),
    name TEXT,
    avatar_url TEXT,
    email TEXT,
    phone TEXT,
    preferences JSONB DEFAULT '{}'::jsonb,
    default_payment_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view only their own profile
CREATE POLICY "Users can view own profile" 
    ON user_profiles 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Create policy for users to update only their own profile
CREATE POLICY "Users can update own profile" 
    ON user_profiles 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- Create policy for users to insert their own profile
CREATE POLICY "Users can insert own profile" 
    ON user_profiles 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_modtime
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_modified_column(); 