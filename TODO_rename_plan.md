# Rename & Separate Country Pages Plan

**Information:**
- Current dynamic route /study-abroad/:country → StudyAbroadCountryPage.tsx (USA full content).
- App.tsx has <Route path="/study-abroad/:country" element={<StudyAbroadCountryPage />} />

**Plan:**
1. Create src/pages/StudyInUSAPage.tsx = current full USA content (rename/move).
2. Create basic pages:
   - StudyInAustraliaPage.tsx (hero australia.jpg, stats, CTA, structured pasted content).
   - StudyInUKPage.tsx (hero, stats, CTA).
   - StudyInJapanPage.tsx
   - StudyInCanadaPage.tsx
3. Update App.tsx routes:
   ```
   <Route path="/study-abroad/usa" element={<StudyInUSAPage />} />
   <Route path="/study-abroad/australia" element={<StudyInAustraliaPage />} />
   <Route path="/study-abroad/uk" element={<StudyInUKPage />} />
   <Route path="/study-abroad/canada" element={<StudyInCanadaPage />} />
   <Route path="/study-abroad/japan" element={<StudyInJapanPage />} />
   ```
4. User delete old StudyAbroadCountryPage.tsx.

**Dependent:**
- src/App.tsx
- new pages in src/pages/

Approve/proceed?
