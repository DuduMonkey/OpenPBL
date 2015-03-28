'use strict';

/**
 * Módulo de serviços
 */
angular.module('openpbl.services', []);

/**
 * Módulo de diretivas
 */
angular.module('openpbl.directives', ['openpbl.services']);

/**
 * Módulo de controllers
 */
angular.module('openpbl.controllers', ['openpbl.services', 'openpbl.directives']);
