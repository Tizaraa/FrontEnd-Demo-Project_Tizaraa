"use client";

import { ReactNode } from "react";
import styled from "styled-components";
import BeatLoader from "react-spinners/BeatLoader";
import Icon from "@component/icon/Icon";
import Select from "@component/Select";
import Sidenav from "@component/sidenav/Sidenav";
import { ProductTileSkeleton } from "@component/product-cards/ProductTile";

// Shared pieces for the product listing pages (category, search, shop, campaign, ...):
// toolbar, product grid, loading skeleton, empty state and "Show more" button.

// Turns a URL slug like "stationery-%26-craft" into "stationery & craft"
export function slugToTitle(slug: string) {
 let text = slug || "";
 try {
  text = decodeURIComponent(text);
 } catch {
  // keep the raw slug if it is not valid URI encoding
 }
 return text.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

// ==============================================================
// Grid
// ==============================================================

export const ListingGrid = styled.div`
 display: grid;
 grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
 gap: 16px;

 @media (max-width: 650px) {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
 }
`;

export const ListingRows = styled.div`
 display: flex;
 flex-direction: column;
 gap: 12px;
`;

export function ListingSkeleton({ count = 8 }: { count?: number }) {
 return (
  <ListingGrid aria-busy="true" aria-label="Loading products">
   {Array.from({ length: count }, (_, i) => (
    <ProductTileSkeleton key={i} />
   ))}
  </ListingGrid>
 );
}

// ==============================================================
// Toolbar
// ==============================================================

const Bar = styled.div`
 display: flex;
 flex-wrap: wrap;
 align-items: center;
 justify-content: space-between;
 gap: 16px 24px;
 margin-bottom: 24px;
 padding: 16px 20px;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;

 .lt-title {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 22px;
  font-weight: 600;
  line-height: 1.25;
  color: ${({ theme }) => theme.tz.color.ink};

  &::first-letter {
   text-transform: uppercase;
  }
 }

 .lt-count {
  margin: 2px 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
  font-variant-numeric: tabular-nums;
 }

 .lt-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
 }

 .lt-sort {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
  white-space: nowrap;
 }

 .lt-sort-select {
  min-width: 170px;
 }

 .lt-view {
  display: inline-flex;
  padding: 3px;
  gap: 2px;
  background: ${({ theme }) => theme.tz.color.mist};
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;
 }

 .lt-view-btn,
 .lt-filter-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 0;
  cursor: pointer;
  font-family: inherit;
  transition: background-color ${({ theme }) => theme.tz.motion.fast},
   color ${({ theme }) => theme.tz.motion.fast};
 }

 .lt-view-btn {
  width: 38px;
  height: 38px;
  border-radius: 6px;
  background: transparent;
  color: ${({ theme }) => theme.tz.color.slate};

  &:hover {
   color: ${({ theme }) => theme.tz.color.ink};
  }

  &[aria-pressed="true"] {
   background: ${({ theme }) => theme.tz.color.paper};
   color: ${({ theme }) => theme.tz.color.emberDeep};
   box-shadow: ${({ theme }) => theme.tz.elevation.rest};
  }
 }

 .lt-filter-btn {
  height: 44px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.ink};
  font-size: 14px;
  font-weight: 600;

  &:hover {
   background: ${({ theme }) => theme.tz.color.mist};
  }
 }

 @media (max-width: 650px) {
  padding: 14px 16px;

  .lt-title {
   font-size: 19px;
  }

  .lt-controls {
   width: 100%;
  }

  .lt-sort {
   flex: 1 1 auto;
  }

  .lt-sort-label {
   display: none;
  }

  .lt-sort-select {
   flex: 1 1 auto;
   min-width: 0;
  }
 }
`;

type SortOption = { label: string; value: any };

type ListingToolbarProps = {
 title: ReactNode;
 count: number;
 sortOptions?: SortOption[];
 sortValue?: any;
 onSortChange?: (option: SortOption) => void;
 view?: "grid" | "list";
 onViewChange?: (view: "grid" | "list") => void;
 // Filter panel shown in a drawer; pass it only when the sidebar is hidden
 mobileFilter?: ReactNode;
};

export function ListingToolbar({
 title,
 count,
 sortOptions,
 sortValue,
 onSortChange,
 view,
 onViewChange,
 mobileFilter,
}: ListingToolbarProps) {
 return (
  <Bar>
   <div>
    <h1 className="lt-title">{title}</h1>
    <p className="lt-count">
     {Number(count || 0).toLocaleString("en-US")}{" "}
     {count === 1 ? "product" : "products"}
    </p>
   </div>

   <div className="lt-controls">
    {sortOptions && onSortChange && (
     <div className="lt-sort">
      <span className="lt-sort-label">Sort by</span>
      <div className="lt-sort-select">
       <Select
        aria-label="Sort products"
        isSearchable={false}
        options={sortOptions}
        defaultValue={sortOptions.find((option) => option.value === sortValue)}
        onChange={onSortChange}
        styles={{ menu: (provided) => ({ ...provided, zIndex: 1000 }) }}
       />
      </div>
     </div>
    )}

    {view && onViewChange && (
     <div className="lt-view" role="group" aria-label="View">
      <button
       type="button"
       className="lt-view-btn"
       aria-label="Grid view"
       aria-pressed={view === "grid"}
       onClick={() => onViewChange("grid")}
      >
       <Icon size="18px" defaultcolor="currentColor">
        grid
       </Icon>
      </button>
      <button
       type="button"
       className="lt-view-btn"
       aria-label="List view"
       aria-pressed={view === "list"}
       onClick={() => onViewChange("list")}
      >
       <Icon size="18px" defaultcolor="currentColor">
        menu
       </Icon>
      </button>
     </div>
    )}

    {mobileFilter && (
     <Sidenav
      position="left"
      scroll={true}
      handle={
       <button type="button" className="lt-filter-btn">
        <Icon size="16px" defaultcolor="currentColor">
         options
        </Icon>
        Filters
       </button>
      }
     >
      {mobileFilter}
     </Sidenav>
    )}
   </div>
  </Bar>
 );
}

// ==============================================================
// Empty state
// ==============================================================

const Empty = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 gap: 8px;
 min-height: 320px;
 padding: 48px 24px;
 text-align: center;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px dashed ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;

 .le-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .le-title {
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.ink};
 }

 .le-text {
  max-width: 360px;
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
`;

export function ListingEmpty({
 title = "No products found",
 message = "We couldn't find anything that matches. Try other filters or browse another category.",
 children,
}: {
 title?: string;
 message?: string;
 children?: ReactNode;
}) {
 return (
  <Empty role="status">
   <span className="le-icon">
    <Icon size="28px" defaultcolor="currentColor">
     search
    </Icon>
   </span>
   <h2 className="le-title">{title}</h2>
   <p className="le-text">{message}</p>
   {children}
  </Empty>
 );
}

// ==============================================================
// Show more
// ==============================================================

const MoreWrap = styled.div`
 display: flex;
 justify-content: center;
 margin-top: 32px;

 button {
  min-width: 180px;
  height: 46px;
  padding: 0 32px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: ${({ theme }) => theme.tz.radius.md}px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.tz.motion.fast},
   border-color ${({ theme }) => theme.tz.motion.fast};

  &:hover:enabled {
   background: ${({ theme }) => theme.tz.color.emberTint};
   border-color: ${({ theme }) => theme.tz.color.ember};
  }

  &:disabled {
   cursor: default;
  }
 }
`;

export function ListingLoadMore({
 onClick,
 loading,
 visible = true,
 label = "Show more",
}: {
 onClick: () => void;
 loading?: boolean;
 visible?: boolean;
 label?: string;
}) {
 if (!visible) return null;

 return (
  <MoreWrap>
   <button type="button" onClick={onClick} disabled={loading}>
    {loading ? <BeatLoader size={9} color="currentColor" /> : label}
   </button>
  </MoreWrap>
 );
}
