import "styled-components";
import { ICompanyStyles } from "../styles/theme";

declare module "styled-components" {
  export interface DefaultTheme extends ICompanyStyles {}
}
