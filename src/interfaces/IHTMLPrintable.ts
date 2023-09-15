export default interface IHTMLPrintable {
  render(...arg: any): HTMLElement[] | HTMLElement; //parameter list is impossible to predetermine
}
