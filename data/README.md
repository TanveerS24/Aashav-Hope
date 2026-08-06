# Problem Statements Data Format

The problem statements for **AASHAV — HOPE** are managed via `/data/problem-statements.txt`.

## File Format Specification

The text file uses a frontmatter-style block separated by `---` lines. Each entry follows this structure:

```txt
---
id: 01
title: TITLE IN CAPITAL LETTERS
domain: Problem Domain / Industry Sector
source: SIH Previous Year
complexity: Beginner / Medium / Advanced / Open
category: Software / Hardware / Hybrid
---
Full detailed description of the problem statement goes here. It can span multiple lines.
```

## Field Descriptions

- **`id`**: Two-digit index padded with leading zero (e.g. `01`, `02`, ..., `08`).
- **`title`**: Concise, impactful problem title.
- **`domain`**: Industry or technical category (e.g., `AI & Public Services`, `IoT & Smart Cities`).
- **`source`**: Attribution metadata (e.g., `SIH Previous Year`).
- **`complexity`**: Complexity tier tag.
- **`category`**: Technical medium (Software, Hardware, Web Accessibility, etc.).
- **Body text**: The paragraph below the `---` block containing the full description.

## Replacing with Real SIH Problem Statements

To replace the 8 default placeholders with real problem statements:
1. Open `/data/problem-statements.txt`.
2. Edit or append problem statements following the `---` delimiter format above.
3. Save the file.
4. The website will automatically parse and display the updated problem statements upon refresh/rebuild.
