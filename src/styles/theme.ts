export interface ICompanyStyles {
  theme: 'white' | 'dark'
  primaryColor: string
  contrastPrimaryColor: string
  dangerColor: string
  warningColor: string
  infoColor: string
  successColor: string
  disabledColor: string // screen.colors.disabled
  noteColor: string
  screenColor: string
  screenContrastColor: string
  text: {
    fontFamily: string
    fontSize: string
  }
}

export const fixedColors = {
  danger: '#ff3d3e',
  warning: '#ffc700',
  info: '#2864ff',
  success: '#00d963',
  coin: '#FAB42C'
}

interface IStyleParams {
  theme: 'white' | 'dark'
  primaryColor: string
  contrastPrimaryColor: string
}

export function generateStyles(params: IStyleParams): ICompanyStyles {
  const { theme, primaryColor, contrastPrimaryColor } = params;
  const isWhite = theme === 'white';
  const screenColor = isWhite ? 'white' : '#343A40';
  const screenContrastColor = isWhite ? '#343A40' : 'white';
  const screenNoteColor = isWhite ? '#767c83' : '#6D7175';
  // const inputDefaultColor = isWhite ? inputWhiteThemeDefaultColor : inputDarkThemeDefaultColor;
  // const inputDisabledColor = isWhite ? inputWhiteDisabledColor : inputDarkThemeDisabledColor;

  return {
    theme: params.theme,
    primaryColor: params.primaryColor,
    contrastPrimaryColor: params.contrastPrimaryColor,
    dangerColor: fixedColors.danger,
    warningColor: fixedColors.warning,
    infoColor: fixedColors.info,
    successColor: fixedColors.success,
    disabledColor: '#BDBDBD',
    noteColor: screenNoteColor,
    screenColor,
    screenContrastColor: screenContrastColor,
    text: {
      fontFamily: 'Poppins',
      fontSize: '15px'
    }
  }
}

/**
 * This allows us to use styles imperatively in any place in any moment.
 * This solves the problem when we just have styles on styledcomponents and we need them in other non-react places too.
 */
class CompanyStyle {
  styles: ICompanyStyles

  constructor() {
    // We always have a style defined.
    this.styles = generateStyles({ theme: 'white', primaryColor: 'teal', contrastPrimaryColor: 'white' });
  }

  setStyles = (params: IStyleParams) => {
    if (!params.theme || !params.primaryColor || !params.contrastPrimaryColor) {
      console.warn('STYLE_WARN', 'Trying to setStyles without enough params');
      return;
    }
    this.styles = generateStyles(params);
  }

}

export const companyStyles = new CompanyStyle();