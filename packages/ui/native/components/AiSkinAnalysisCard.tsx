import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from './Card';
import { colors } from '@vibewell/ui-core-theme';
import { supabase } from '@vibewell/api';
import { useNavigation } from '@react-navigation/native';

export interface AiSkinAnalysisCardProps {
  userId: string;
  onStartAnalysis?: () => void;
}

interface SkinAnalysisData {
  hydration: number;
  elasticity: number;
  recommendedProducts: string[];
}

export const AiSkinAnalysisCard: React.FC<AiSkinAnalysisCardProps> = ({
  userId,
  onStartAnalysis,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<SkinAnalysisData | null>(null);
  const navigation = useNavigation();

  const startAnalysis = async () => {
    if (onStartAnalysis) {
      onStartAnalysis();
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-skin', {
        body: { userId }
      });
      
      if (error) {
        throw error;
      }
      
      setAnalysisData(data);
    } catch (err) {
      console.error('Error during skin analysis:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze skin');
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = () => {
    // @ts-ignore - This is to handle the type checking since we don't have the screen type definition
    navigation.navigate('SkinAnalysisScreen');
  };

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            {/* Flame icon */}
            <Text style={styles.icon}>🔥</Text>
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>AI Skin Analysis</Text>
            <Text style={styles.subtitle}>Get personalized skincare recommendations</Text>
          </View>
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.coral[500]} />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.tryAgainButton}
              onPress={startAnalysis}
              activeOpacity={0.8}
            >
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : analysisData ? (
          <View style={styles.analysisContainer}>
            <View style={styles.metricsContainer}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Hydration</Text>
                <Text style={styles.metricValue}>{analysisData.hydration}%</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Elasticity</Text>
                <Text style={styles.metricValue}>{analysisData.elasticity}%</Text>
              </View>
            </View>
            
            {analysisData.recommendedProducts && analysisData.recommendedProducts.length > 0 && (
              <View style={styles.productsCard}>
                <Text style={styles.productsLabel}>Recommended Products</Text>
                {analysisData.recommendedProducts.slice(0, 2).map((product, index) => (
                  <Text key={index} style={styles.productItem}>{product}</Text>
                ))}
                {analysisData.recommendedProducts.length > 2 && (
                  <Text style={styles.moreProductsText}>
                    + {analysisData.recommendedProducts.length - 2} more
                  </Text>
                )}
              </View>
            )}
            
            <TouchableOpacity
              style={styles.button}
              onPress={viewDetails}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={startAnalysis}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Start Your Analysis</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginVertical: 10,
    backgroundColor: colors.coral[50],
  },
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.coral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[900],
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: colors.neutral[600],
  },
  button: {
    marginTop: 16,
    backgroundColor: colors.coral[500],
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.blush[50],
    borderRadius: 8,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
  },
  tryAgainButton: {
    marginTop: 8,
    alignItems: 'center',
  },
  tryAgainText: {
    color: colors.coral[600],
    fontSize: 12,
    fontWeight: '500',
  },
  analysisContainer: {
    marginTop: 12,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 4,
  },
  metricLabel: {
    fontSize: 10,
    color: colors.neutral[500],
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  productsCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  productsLabel: {
    fontSize: 10,
    color: colors.neutral[500],
    marginBottom: 6,
  },
  productItem: {
    fontSize: 12,
    color: colors.neutral[700],
    marginBottom: 2,
  },
  moreProductsText: {
    fontSize: 10,
    color: colors.coral[600],
    marginTop: 2,
  },
}); 