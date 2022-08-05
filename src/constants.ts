// API
export const API_BASE_URL: string | undefined =
  process.env.REACT_APP_API_BASE_URL;

interface LayoutOptions {
  table: string;
  tile: string;
}
// Layouts
export const LAYOUT_OPTIONS: Readonly<LayoutOptions> = {
  table: "table",
  tile: "tile",
};
