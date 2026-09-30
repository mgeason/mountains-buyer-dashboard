# Mountains Buyer

A dependency-free, static interactive buyer dashboard for Katoomba, Leura and Blackheath.

## Start

Open `index.html` in a current desktop browser. The initial dataset is empty. In **Criteria & data**, choose **Load sourced examples** for two historical records, or **Explore synthetic demo** for invented data that exercises the charts. Replacing a dataset prompts for confirmation. Export a JSON backup first when you have records to preserve.

Default brief:

- House, 2–4 main-house bedrooms, at least 800 m² as an approximate target.
- $1,150,000 maximum when an existing studio is recorded; secondary dwelling approval remains a separate evidence check.
- $850,000 maximum without a studio; usable building space must be separately recorded.
- A studio advertised as an office, garden room or accommodation does not automatically establish approved dwelling use.

## Features

- Address/suburb/status/criteria/shortlist filters and price, age and reduction sorting.
- Quarterly recorded-sale medians with sample counts, guide-to-sale comparison, price versus current campaign age, and suburb summaries.
- Property detail timelines with withdrawal/relisting gaps, source links, observed/provider evidence basis, private notes and shortlist.
- Editable criteria weights. Unknown evidence earns no points and remains explicit.
- Comparable ranking and manually documented dollar adjustments. At least three selected dated sales are required by default before a median and min–max adjusted range is shown. This range is not a statistical confidence interval or formal valuation.
- JSON backup/export and CSV imports; no account, paid API key or browser extensions required.

## GitHub Pages

1. Create a repository and upload `index.html` and `.nojekyll` into its root. README and the empty template may be included.
2. Repository **Settings → Pages → Build and deployment → Deploy from a branch**.
3. Choose your publishing branch (normally `main`) and `/ (root)`; save.
4. GitHub supplies a URL such as `https://USERNAME.github.io/REPOSITORY/`.

GitHub Pages is a static service. Free accounts support Pages from public repositories; see https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages.

Only publish the empty app. Browser records and private notes are not uploaded by the app. Never commit personal backups, proprietary reports, API credentials or paid datasets to a public repository. Opening a local file and opening the hosted site use separate browser storage; transfer records by exporting/importing a backup. Storage is local to the browser/profile/origin and does not sync between devices. Browser clearing can erase it.

Publishing from this session is pending a connected GitHub account and a chosen repository.

## Data contract

CSV headers (case sensitive):

```
id,address,suburb,type,status,beds,baths,land,studio,approval,buildSpace,askLow,askHigh,soldPrice,soldDate,source,observed,evidence,notes,events
```

- `suburb`: Katoomba, Leura or Blackheath.
- `type`: house or other. `status`: active, sold, withdrawn or unknown.
- `beds` should describe the main house. Do not silently combine a studio bedroom with the main-house count.
- `studio`, `buildSpace`: yes, no or unknown. `approval`: confirmed, no or unknown.
- Numeric fields are plain numbers without `$`, commas or units. Blank means unknown; zero is a recorded zero.
- Dates are ISO `YYYY-MM-DD`. Unknown sale/listing dates stay blank.
- `id` identifies a property. Use a stable id across imports. When blank, an id is derived from address and suburb; keep their spelling consistent. CSV/JSON-array imports merge by id. Full JSON backups replace the dataset after confirmation.
- `events`: JSON array, quoted and escaped according to CSV conventions. Supported kinds: listed, relisted, guide, updated, withdrawn, sold. Each event requires a known date; numeric guide events use `low` and optional `high`; sale events use `price`. Optional fields: `source`, `basis` (observed or provider).

Example event array:

```json
[
  {"date":"2026-09-01","kind":"listed","low":850000,"high":900000,"basis":"provider","source":"https://example.com/listing"},
  {"date":"2026-09-20","kind":"guide","low":825000,"high":875000,"basis":"observed","source":"https://example.com/listing"}
]
```

The above example is illustrative, not evidence of a real listing. Saving or importing a changed current guide adds an observed guide event. It does not infer a listing start. Preserve the provider's exact guide wording and date in evidence/notes where necessary. Unpriced listings cannot support sale-to-guide calculations.

Original guide means the numeric guide recorded at the start of the current campaign. A later first observation is not treated as the original guide. Current campaign age requires an explicit listed/relisted event. Cumulative advertised time is unknown when previous relisting intervals are missing. Price revisions retain guide ranges; percentage comparisons use midpoint and show sale-to-range endpoints in detail.

## Free data and integration status

NSW Valuer General offers free bulk sales records from 1990 onwards and weekly current records:
https://valuation.property.nsw.gov.au/embed/propertySalesInformation

The bulk files could not be retrieved in this session (network/fetch failures). **No bulk data or live listings have been ingested.** Do not interpret the example/demo charts as market-wide statistics. Government data must be cleaned, deduplicated, classified by property type, matched by address and enriched with house attributes before using this import contract. Government land valuation is not the market value of the whole improved property. Review source licensing, including stated BY-NC-ND terms, before publishing derived data.

Microburbs describes separate API credit access:
https://www.microburbs.com.au/api-access

The user's Basic account has not been accessed. API entitlement, CSV exports, record coverage and redistribution rights have not been verified. No subscription upgrade is assumed. Start with manually entering permitted report facts and source dates; connect a licensed API only if needed later.

Campaign history research:
https://www.homerapp.com.au/consumer
https://www.spachus.com.au/home

Their local completeness and data export access have not been verified. A live listing feed, background refresh and cross-device data sync are not implemented.

## Historical evidence examples

1. 35 Mistral Street, Katoomba — house, 4 beds, 1 bath, 910 m²; sold $632,000 on 22 July 2024. Original guide, listing start, studio status and usable building space unknown. Source accessed 30 September 2026:
https://www.realestate.com.au/sold/property-house-nsw-katoomba-145368472
2. 34 Freelander Avenue, Katoomba — house, 3 beds, 2 baths, 613 m²; agent page states sold $860,000 and advertises an attached studio with separate entrance/bathroom. Sale date, kitchen facilities and dwelling approval unverified. Below the default land target. Source accessed 30 September 2026:
https://purcellproperty.com.au/property/34-freelander-avenue-katoomba-nsw-2780/

## Validation

JavaScript syntax and logic checks passed for initialization, calculations, date validation, budget routing, campaign gaps/relisting, observed guide events, CSV quoting, stable ids, safe URL schemes, demo and historical example loading. A graphical browser was unavailable in the execution environment, so visual layout and end-to-end browser interactions have not been verified. Responsive layouts and semantic labels are included.
