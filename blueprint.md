# Aura Spatial Blueprint

## Overview
Aura Spatial is a unified home renovation platform designed to streamline communication and procurement between homeowners, interior designers, and furniture vendors in Singapore. It integrates 3D visualization with a marketplace to ensure a seamless "visualize to purchase" experience.

## Detailed Outline
The platform currently consists of:
- **Core Architecture:** Built with React and TypeScript, using Vite as the build tool.
- **Database:** A PostgreSQL schema (`schema.sql`) defining users, project cases, marketplace inventory, and transactions.
- **UI/UX:** A foundational landing page (`src/App.tsx`) with modern styling (`styles.css` and `src/App.css`).
- **User Journey:** Documented in `userjourney.md`, outlining the flow from client RFQ to ID bidding, project execution, and marketplace shopping.

## Current Plan: Feature Directory Setup
We are establishing the directory structure for the main application modules within `src/pages`:
- `explore/`: For homeowners to browse themes, inspirations, and published RFQs.
- `marketplace/`: For the integrated e-commerce experience where clients can shop for furniture and decor.
- `status/`: For tracking project milestones, status updates, and case management.
- `pricing/`: For managing service fees, commission models, and designer subscriptions.

### Steps
1. [x] Create feature directories in `src/pages`.
2. [x] Initialize `blueprint.md`.
3. [ ] Commit and push changes to GitHub.
