import { parseTemplate } from "./url-parse"

export const urlTemplateInterceptor = (options: { urlAsTemplate?: any } = {}) => (config) => {
  const { url: originalUrl, urlTemplate, urlTemplateParams = {} } = config
  const { urlAsTemplate = true } = options

  if (urlTemplate != null) {
    const url = parseTemplate(urlTemplate).expand(urlTemplateParams);
    return {
      ...config,
      url,
      urlTemplate,
      urlTemplateParams,
    };
  } else if (urlAsTemplate && originalUrl != null) {
    const url = parseTemplate(originalUrl).expand(urlTemplateParams)
    return {
      ...config,
      url,
      urlTemplate: originalUrl,
      urlTemplateParams,
    };
  }
  return config
};

export const useUrlTemplateInterceptor = (
  instance,
  options = {}
) => {
  instance.interceptors.request.use(urlTemplateInterceptor(options))
};
