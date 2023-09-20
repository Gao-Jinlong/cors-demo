import "./customError.d"
/**
 * 扩展Error类
 * @param message - Error message
 * @param code- Error code
 * @param data - Error data
 *
 * @description DTO: Data Transfer Object 仅用于数据传输的对象，暴露内部数据，不包含业务逻辑
 */
class CustomError<C, T> extends Error {
  public readonly single?: C
  public readonly data?: T
  public constructor(message: string, code?: C, data?: T) {
    super(message)
    this.single = code
    this.data = data
  }
}
export default (function install() {
  Reflect.defineProperty(globalThis, "CustomError", {
    value: CustomError,
    writable: false,
    enumerable: true,
    configurable: false,
  })
})()
