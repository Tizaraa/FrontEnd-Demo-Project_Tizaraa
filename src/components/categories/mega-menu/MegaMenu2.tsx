// import Card from "@component/Card";
// import MegaMenu3 from "./MegaMenu3";
// import CategoryMenuItem from "../CategoryMenuItem";
// import { StyledMegaMenu1 } from "./styles";
// import { MegaMenu2Props } from "./type";

// export default function MegaMenu2({ data }: MegaMenu2Props) {
//   return (
//     <StyledMegaMenu1 className="mega-menu">
//       <Card ml="1rem" py="0.5rem" boxShadow="regular" overflow="hidden" borderRadius={8}>
//         {data?.map((item) => (
//           <CategoryMenuItem
//             key={item.title}
//             href={item.href}
//             icon={item.icon}
//             title={item.title}
//             caret={!!item.menuData}>
//             {item.menuData && <MegaMenu3 minWidth="560px" data={item.menuData} />}
//           </CategoryMenuItem>
//         ))}
//       </Card>
//     </StyledMegaMenu1>
//   );
// }

import Card from "@component/Card";
import MegaMenu3 from "./MegaMenu3";
import CategoryMenuItem from "../CategoryMenuItem";
import { StyledMegaMenu1 } from "./styles";
import { MegaMenu2Props } from "./type";
import NavLink from "@component/nav-link";

export default function MegaMenu2({ data }: MegaMenu2Props) {
  return (
    <StyledMegaMenu1 className="mega-menu">
      <Card ml="1rem" py="0.5rem" boxShadow="regular" overflow="hidden" borderRadius={8}>
        {data?.map((item) => (
          <CategoryMenuItem
            key={item.title}
            href={item.href}
            icon={item.icon}
            title={item.title}
            caret={!!item.menuData}
          >
            {/* Render MegaMenu3 if menuData exists */}
            {item.menuData && <MegaMenu3 minWidth="560px" data={item.menuData} />}
            
            {/* Render subcategories if they exist */}
            {item.subCategories?.map((sub, ind) => (
              <NavLink key={ind} className="child-link" href={`/category/${sub.href}`}>
                {sub.title}
              </NavLink>
            ))}
          </CategoryMenuItem>
        ))}
      </Card>
    </StyledMegaMenu1>
  );
}
