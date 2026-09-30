# Mountains Buyer

A self-contained static property research dashboard.

## Launch

1. Open [Settings → Pages](https://github.com/mgeason/mountains-buyer-dashboard/settings/pages).
2. Under **Build and deployment**, choose **Source: GitHub Actions**.
3. Open [Actions → Publish dashboard](https://github.com/mgeason/mountains-buyer-dashboard/actions/workflows/pages.yml) and run the workflow on `main`.

After a successful deployment, the site will be at:
https://mgeason.github.io/mountains-buyer-dashboard/

Pages has not been enabled through the connected tools. The URL is not confirmed live.

## Use

The app starts with an empty dataset. Add properties or import CSV/JSON.
Optional historical examples and an explicitly labelled synthetic demo are available under **Criteria & data**.
Neither represents a complete current market dataset.

Features include a filtered watchlist, shortlists, editable criteria, evidence timelines,
asking-price revisions, recorded-sale charts, sale-to-guide comparisons and comparable assessments.

Unknown approvals, dates, prices and building space remain unknown.
Comparable ranges require selected dated sales and documented adjustments; they are not formal valuations.

Records and notes stay in your browser and do not sync across devices.
Export regular JSON backups. Backups from the earlier downloadable dashboard are supported.
Do not commit private records, backups, paid datasets or credentials.

## Data

No live listing feed, government bulk sales dataset or paid data connection is configured.
Use the empty CSV template or enter sourced observations manually.
The app explains the import fields, source links and calculation limits.

## Development

No dependencies or build process. Open `index.html` in a current browser.
Run `node tests.cjs` to check calculations and core data handling.
GitHub Actions runs these checks before publishing only `index.html` and `.nojekyll`.
Graphical browser/visual QA remains pending.
