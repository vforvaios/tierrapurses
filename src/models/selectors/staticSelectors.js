const pages = ({ staticReducer }) => staticReducer?.pages;
const keywords = ({ staticReducer }) => staticReducer?.keywords;
const staticPagesInMenu = ({ staticReducer }) =>
  staticReducer?.staticPagesInMenu;

export { pages, keywords, staticPagesInMenu };
