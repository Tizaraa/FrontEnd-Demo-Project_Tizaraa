import styled from "styled-components";
import { getTheme } from "@utils/utils";

export const StyledMiniCart = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;

  .cart-list {
    flex: 1 1 0;
    overflow: auto;
  }

  .no-spin-button::-webkit-outer-spin-button,
.no-spin-button::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

.no-spin-button {
  -moz-appearance: textfield;
  user-select: none;
}

.no-spin-button:focus {
  border-color: transparent; /* Hides the selected border color */
  outline: none; /* Removes the outline when focused */
}




  .cart-item {
    display: flex;
    padding: 1rem;
    align-items: center;

    .add-cart {
      text-align: center;
    }

    .product-image {
      width: 64px;
      height: 64px;
      margin-left: 1rem;
      border-radius: 5px;
      margin-right: 1rem;
    }

    .product-details {
      flex: 1 1 0;
      min-width: 0px;

      .title {
        margin: 0px;
        line-height: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .clear-icon {
      cursor: pointer;
      color: ${getTheme("colors.gray.600")};
    }
  }

  .actions {
    margin: 1rem 1rem 0.75rem;
  }
`;
