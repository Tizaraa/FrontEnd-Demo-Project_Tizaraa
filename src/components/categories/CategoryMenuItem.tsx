import Link from "next/link";
import Icon from "@component/icon/Icon";
import { StyledCategoryMenuItem } from "./styles";

// ===============================================================
type CategoryMenuItemProps = {
 href: string;
 icon?: string;
 title: string;
 caret?: boolean;
 children: any;
};
// ===============================================================

export default function CategoryMenuItem(props: CategoryMenuItemProps) {
 const { href, icon, title, caret = true, children } = props;

 return (
  <StyledCategoryMenuItem>
   <Link href={`/category/${href}`}>
    <div className="category-dropdown-link">
     {/* {icon && <Icon variant="small">{icon}</Icon>} */}
     <span className="title">{title}</span>
     {caret && <Icon variant="small">chevron-right</Icon>}
    </div>
   </Link>

   {children}
  </StyledCategoryMenuItem>
 );
}

// import Link from "next/link";
// import Icon from "@component/icon/Icon";
// import { StyledCategoryMenuItem } from "./styles";
// import { toast } from "react-toastify";
// import { Console } from "console";
// import { Children } from "react";

// // ===============================================================
// type CategoryMenuItemProps = {
//   href: string;
//   icon?: string;
//   title: string;
//   caret?: boolean;
//   children: any;
// };
// // ===============================================================

// export default function CategoryMenuItem(props: CategoryMenuItemProps) {
//   const { href, icon, title, caret = true, children } = props;

//   // Predefined categories that should have clickable links
//   const clickableCategories = [
//     "Home & Lifestyles",
//     "Fashion & Grooming",
//     "Grocery",
//     "Electrical & Electronics",
//   ];

//   // Check if the category is clickable based on title
//   const isClickable = clickableCategories.includes(title);

//   const handleClick = (e: React.MouseEvent) => {
//     // If the category is not clickable, prevent default link behavior and show alert
//     if (!isClickable) {
//       e.preventDefault(); // Prevent the link from being clicked
//       toast("Coming soon");
//     }
//   };

//   return (
//     <StyledCategoryMenuItem>
//       {isClickable ? (
//         <Link href={`/category/${href}`}>
//           <div
//             className="category-dropdown-link"
//             onClick={handleClick}
//           >
//             {/* Uncomment and adjust for icon if needed */}
//             {/* {icon && <Icon variant="small">{icon}</Icon>} */}
//             <span className="title">{title}</span>
//             {caret && <Icon variant="small">chevron-right</Icon>}
//           </div>
//       {children}

//         </Link>

//       ) : (
//         <div className="category-dropdown-link non-clickable" onClick={handleClick}>
//           <span className="title">{title}</span>
//           {caret && <Icon variant="small">chevron-right</Icon>}
//         </div>
//       )}

//       {isClickable && children}

//     </StyledCategoryMenuItem>
//   );
// }
