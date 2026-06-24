# BC Recreational Freshwater Fishing Licence Cost Calculator

## The Formula

```
totalCost = baseFee + sum(conservationStamps) + whiteSturgeon + classifiedWaters
```

Each component is a config-driven lookup. Exemptions short-circuit to `total = 0`.

### 1. Exemptions (checked first, return early)

| Condition                                                   | Result                       |
| ----------------------------------------------------------- | ---------------------------- |
| `residency === 'bc_resident'` AND `age < 16`                | Exempt — no licence required |
| `residency === 'bc_resident'` AND `isFirstNations === true` | Exempt under Indian Act      |

### 2. Base Fee

| Condition                                         | Rate                        |
| ------------------------------------------------- | --------------------------- |
| BC Resident — annual                              | $41.15                      |
| BC Resident — 8-day                               | $22.86                      |
| BC Resident — 1-day                               | $11.43                      |
| BC Resident — annual AND `age >= 65`              | $5.71 (senior override)     |
| BC Resident — annual AND `hasDisabilityReduction` | $1.14 (disability override) |
| Non-Resident — annual                             | $62.87                      |
| Non-Resident — 8-day                              | $41.15                      |
| Non-Resident — 1-day                              | $22.86                      |
| Non-Resident Alien — annual                       | $91.44                      |
| Non-Resident Alien — 8-day                        | $57.14                      |
| Non-Resident Alien — 1-day                        | $22.86                      |

Note: disability reduction takes precedence over senior rate when both apply.

### 3. Conservation Surcharge Stamps (additive, per species selected)

| Stamp                       | Resident | Non-Resident/Alien |
| --------------------------- | -------- | ------------------ |
| Steelhead                   | $28.57   | $68.57             |
| Non-tidal salmon            | $17.14   | $34.29             |
| Kootenay Lake rainbow trout | $11.43   | $22.86             |
| Shuswap Lake rainbow trout  | $11.43   | $22.86             |
| Shuswap Lake char           | $11.43   | $22.86             |

### 4. White Sturgeon Conservation Licence (optional add-on)

| Duration | Resident | Non-Resident/Alien |
| -------- | -------- | ------------------ |
| Annual   | $28.57   | $68.58             |
| 8-day    | $17.14   | $34.29             |
| 1-day    | $9.14    | $17.14             |

### 5. Classified Waters Licence (optional add-on)

| Scenario                                   | Rate               |
| ------------------------------------------ | ------------------ |
| BC Resident — any duration (Class I or II) | $17.15 flat annual |
| Non-Resident/Alien — Class I               | $45.72 × numDays   |
| Non-Resident/Alien — Class II              | $22.86 × numDays   |

---

## Input Variables

```typescript
interface FishingLicenceInput {
  residency: "bc_resident" | "non_resident" | "non_resident_alien";
  duration: "annual" | "eight_day" | "one_day";
  age: number;
  isFirstNations?: boolean; // default false
  hasDisabilityReduction?: boolean; // default false; BC Resident annual only
  conservationStamps?: ConservationStamp[]; // any combination of the 5 stamp types
  includeWhiteSturgeon?: boolean; // default false
  classifiedWaters?: {
    class: "class1" | "class2";
    days?: number; // for non-residents; defaults to 1
  };
}
```
