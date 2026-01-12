import { BooleanValue, ListValue, NullValue, NumberValue, StringValue, type Value } from "obsidian";

export const aValue = (primitive: unknown): Value => {
  if (typeof primitive === 'string') {
    return new StringValue(primitive)
  }
  if (typeof primitive === 'number') {
    return new NumberValue(primitive)
  }
  if (typeof primitive === 'boolean') {
    return new BooleanValue(primitive)
  }
  if (Array.isArray(primitive)) {
    return new ListValue(primitive.map(aValue))
  }

  if (primitive === undefined) {
    return new NullValue();
  }

  throw new Error(`Invalid primitive: ${primitive}`)
}
