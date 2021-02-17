import { DEFAULT_API_VERSION } from '../config';
import { Headers, Options, ErrorType, ValidatedOptions } from '../types';
import { AxiosError } from 'axios';

export const validateOptions = (options?: Options): ValidatedOptions => {
  if (!options || (!options.customBackend && !options.projectId)) {
    throw Error('Missing customBackend or projectId option');
  }

  if (!options.projectId && !options.customBackend) {
    throw Error('Missing param projectId in options');
  }

  if (options.version && !isNaN(options.version)) {
    throw Error('Param version is not a number');
  }

  return {
    customBackend: options.customBackend,
    projectId: options.projectId,
    isTestnet: options.isTestnet,
    version: options.version || DEFAULT_API_VERSION,
  };
};

export const getHeaders = (projectId?: string): Headers | null => {
  if (!projectId) {
    return null;
  }

  return {
    project_id: projectId,
  };
};

export const handleError = (error: AxiosError): ErrorType => {
  return {
    statusCode: error.response?.data.status_code,
    error: error.response?.data.error,
    message: error.response?.data.message,
  };
};