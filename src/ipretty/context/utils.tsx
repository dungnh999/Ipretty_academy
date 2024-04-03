import { findValueInEnum, parseBoolean } from "ipretty/helpers/misc";
import { Sort } from "ipretty/types/types";

export function accessObjectFromString(separation: any, elementToAccess: any, object: any) {
    return elementToAccess.split(separation).reduce((o: any, i: any) => o ? o[i] : o, object);
}

export function translate(translationFile: any, lang: any, key: any, ...args) {
    let result = translationFile[lang][key];

    if(!result) {
        result = accessObjectFromString('.', key, translationFile[lang]);
    }

    if(!result) {
        return key;
    }

    if (Array.isArray(args) && args.length) {
        return result.replace(/{(\d+)}/g, (_, n) => args[+n-1]);
    }

    return result;
}

export function asSortParams<
  TParams extends Record<any, string>,
  TFields extends Record<any, string>
>(
  params: TParams,
  fields: TFields,
  defaultField?: keyof TFields,
  defaultOrder?: boolean
): TParams & Sort {
  return {
    ...params,
    asc: parseBoolean(
      params.asc,
      defaultOrder === undefined ? true : defaultOrder
    ),
    sort: params.sort
      ? findValueInEnum(params.sort, fields)
      : defaultField as string || "name"
  };
}
