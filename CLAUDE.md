# Haven Website — lulhaven.com

## File layout
| File | Contents | Lines |
|---|---|---|
| `demo.html` | HTML shell + CSS only — no data, no logic | ~169 |
| `js/haven-data.js` | `hdDataset` (category/item list) + `itemUrls` (key→URL) | ~97 |
| `js/haven-tooltips.js` | `itemTooltips` (key→tooltip string) | ~508 |
| `js/haven-ui.js` | All UI functions: hdMakeRow, hdToggle, hdSearch, hdSelect, etc. | ~252 |
| `api/feed.json` | Canonical feed data served to routers | — |

**Rule:** Data changes go in haven-data.js or haven-tooltips.js. Logic changes go in haven-ui.js. Never put JS in demo.html.

## Key conventions
- **makeKey**: lowercase, non-alphanumeric runs → single `_`, slash separator
  `"Politics & Government" / "The Drudge Report"` → `politics_government/the_drudge_report`
- **itemUrls**: key + URL string = linked item; key + `null` = filterable, no link; key absent = no strategy (grayed out, disabled checkboxes)
- **itemTooltips**: `"Fact · Fact · Fact"` format, middle dot separator, applied via `title` attribute
- **Cross-category sync**: `hdBuildNameGroups()` auto-detects identical names across categories — no hardcoded rules
- **AllSides / Drudge Report**: appear in both News & Media AND Politics & Government — nameGroups syncs them automatically

## Deploy
```
~/scripts/deploy-lulhaven.sh
```
Also push to GitHub first: `git push` from `~/Downloads/lulhaven/lulhaven.com/`
