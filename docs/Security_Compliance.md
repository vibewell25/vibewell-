# Security & Compliance Checklist

Ensuring Vibewell meets security standards and regulatory requirements.

---

## 1. GDPR Compliance

* [ ] Data processing agreements in place
* [ ] User consent for personal data
* [ ] Right to access, rectify, erase user data
* [ ] Data breach notification procedures

---

## 2. HIPAA Compliance (if applicable)

* [ ] Business Associate Agreements (BAA)
* [ ] PHI encryption at rest and in transit
* [ ] Audit logging for data access
* [ ] Employee training on PHI handling

---

## 3. SOC2 Requirements

* [ ] Secure data storage and backup
* [ ] Access controls and authentication
* [ ] Change management policies
* [ ] Incident response plan

---

## 4. OWASP Top 10 Mitigations

* [ ] Injection: Use parameterized queries (Prisma)
* [ ] Broken Auth: Supabase Auth with MFA
* [ ] Sensitive Data Exposure: TLS everywhere
* [ ] XML External Entities: Avoid XML parsing
* [ ] Broken Access Control: RLS policies
* [ ] Security Misconfiguration: Harden HTTP headers
* [ ] XSS: Escape user input in UI
* [ ] Insecure Deserialization: Avoid eval/serialize
* [ ] Using Components with Known Vulnerabilities: Dependency scanning (Snyk)
* [ ] Insufficient Logging & Monitoring: Sentry, Datadog alerts

---

## 5. Additional Security Measures

* Content Security Policy (CSP) on web
* Strict-Transport-Security (HSTS)
* CORS whitelist only needed origins
* Rate limiting on APIs
* Encryption of secrets via Doppler/Vault

---

## 6. Audit & Pentest Schedule

* Quarterly internal security audits
* Annual third-party penetration tests

*End of Security & Compliance Checklist.* 