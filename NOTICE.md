# NOTICE

## ShieldSign - AGPL-3.0 Compliance Notice

**ShieldSign** is a commercial fork of the open-source [Documenso](https://github.com/documenso/documenso) project (v2.1.0).

### Original Project

- **Name:** Documenso
- **Repository:** https://github.com/documenso/documenso
- **License:** GNU Affero General Public License v3.0 (AGPL-3.0)
- **Copyright:** © 2023-2025 Documenso, Inc.

### Fork Information

- **Fork Name:** ShieldSign
- **Repository:** https://github.com/KatalystDigital/shieldsign-core
- **Maintained by:** KatalystDigital
- **License:** AGPL-3.0 (unchanged from original)

### Summary of Modifications

This fork includes the following modifications from the original Documenso codebase:

1. **Rebranding**
   - Product name changed from "Documenso" to "ShieldSign"
   - Updated domain references to shieldsign.io
   - Custom color scheme (Primary: #0a3b3c, Accent: #14b8a6)
   - Updated logos, icons, and brand assets
   - Modified email templates and legal documents

2. **Enhanced Audit Trail**
   - Extended audit logging with IP address, user agent, and document hashing
   - SHA-256 document integrity verification
   - Enhanced compliance reporting for ESIGN, UETA, and eIDAS SES

3. **API Improvements**
   - API versioning (/v1 namespace)
   - Enhanced webhook system
   - Improved API token management

4. **Authentication Enhancements**
   - Prepared OAuth providers (Google, Microsoft)
   - Prepared hooks for future SSO (SAML/SCIM)

5. **Infrastructure**
   - Azure-optimized deployment configuration
   - Docker improvements for cloud deployment
   - Environment variable restructuring (SHIELDSIGN_* prefix)

6. **Template System**
   - Built-in NDA, DPA, and MSA template foundations
   - Template management improvements

### AGPL-3.0 Compliance

This fork remains fully compliant with AGPL-3.0:

- ✅ Source code is publicly available
- ✅ LICENSE file retained (AGPL-3.0)
- ✅ Original copyright notices preserved
- ✅ Modification notices added where required
- ✅ Network use provision maintained (source available to network users)
- ✅ No proprietary code mixed into this repository

### Attribution

We gratefully acknowledge the Documenso team for creating the excellent open-source document signing platform that serves as the foundation for ShieldSign.

Documenso Contributors: https://github.com/documenso/documenso/graphs/contributors

### Contact

- **ShieldSign Support:** support@shieldsign.io
- **Website:** https://shieldsign.io
- **Source Code:** https://github.com/shieldsign/shieldsign-core

---

© 2025 ShieldSign. This software is licensed under AGPL-3.0.
Original work © 2023-2025 Documenso, Inc.
