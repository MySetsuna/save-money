// =================keys==========================

export const MAIN_SIDER_WIDTH_KEY = 'mainSiderWidth';
export const DASHBOARDS_KEY = 'dashboards';
export const SIDER_RESIZER_COLOR_KEY = 'siderResizerColor';
export const HEADER_KEY = 'header';

// ==================default values==========================

export const DEFAULT_SIDER_RESIZER_COLOR = 'pink';
export const DEFAULT_SIDER_SIDER_WIDTH = 300;
export const DEFAULT_HEADER = 'BalanceHeader';
// ------------------ Balanceheader Values --------------------------------
export const BALANCE_LAVEL_HIGHT = 'hight';
export const BALANCE_LAVEL_MIDDLE = 'middle';
export const BALANCE_LAVEL_LOW = 'low';
// -----------------------addtion value---------------------------------------------
export const ADD_TYPE_COST = 1;
export const ADD_TYPE_INCOME = 2;
export const ADD_TYPE_BUDGETCUTS = 3;
export const ADD_TYPE_BUDGETADD = 4;
export const ADD_TYPE_MAP = {
  [`${ADD_TYPE_COST}`]: '支出',
  [`${ADD_TYPE_INCOME}`]: '收入',
  [`${ADD_TYPE_BUDGETCUTS}`]: '削减预算',
  [`${ADD_TYPE_BUDGETADD}`]: '增加预算',
};

export const CSS_BORDER_COLOR = '--border-color';
export const CSS_BAR_COLOR = '--bar-color';

// ==================== limit values====================================

export const MIN_MAIN_SIDER_WIDTH = 100;
