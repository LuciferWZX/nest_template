import { customAlphabet } from 'nanoid';

export const Libs = {
  generateId(size?: number) {
    // 定义你想要使用的字符集，不包含连字符（-）
    const alphabet =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    // 创建一个自定义的 nanoid 生成函数
    const customNanoid = customAlphabet(alphabet, size ?? 16); // 生成长度为 10 的 ID

    // 使用自定义的 nanoid 生成函数来生成 ID
    return customNanoid();
  },
};
