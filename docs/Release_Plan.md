# Release Plan

Defines release cadence, branching, versioning, and rollback procedures.

---

## 1. Release Cadence

* **Canary**: Daily deployments to a small percentage of users.
* **Staging**: Weekly full environment for QA and UAT.
* **Production**: Bi-weekly or on-demand for critical fixes.

---

## 2. Branching Strategy

* **Main**: Production-ready code.
* **Develop**: Integration branch for feature merges.
* **Feature/**\*: Individual feature branches.
* **Hotfix/**\*: Urgent fixes off `main`.

---

## 3. Versioning

* Semantic Versioning: MAJOR.MINOR.PATCH
* Tag releases with `vMAJOR.MINOR.PATCH` in Git.

---

## 4. Release Steps

1. **Merge** feature branch into `develop` → run CI.
2. **Smoke Test** on staging.
3. **Merge** `develop` into `main` with PR review.
4. **Tag** release.
5. **Deploy** to production.
6. **Monitor** health metrics.

---

## 5. Rollback Procedures

* **Vercel**: Roll back to previous deployment via dashboard.
* **Expo**: Publish rollback OTA update.
* **Database**: Use Prisma migrations with `prisma migrate resolve` to revert.

---

## 6. Post-Release

* **Clean Up**: Delete merged feature branches.
* **Retrospective**: Document lessons learned.
* **Update Docs**: Version numbers + changelog. 