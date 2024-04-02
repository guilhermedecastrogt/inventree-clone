



/* globals
    buildCodes,
    global_settings,
    inventreeGet,
    purchaseOrderCodes,
    returnOrderCodes,
    returnOrderLineItemCodes,
    salesOrderCodes,
    stockCodes,
*/

/* exported
    getAvailableTableFilters,
*/


// Construct a dynamic API filter for the "issued by" field
function constructIssuedByFilter() {
    return {
        title: 'Aufgegeben von',
        options: function() {
            let users = {};

            inventreeGet('/api/user/', {}, {
                async: false,
                success: function(response) {
                    for (let user of response) {
                        users[user.pk] = {
                            key: user.pk,
                            value: user.username
                        };
                    }
                }
            });

            return users;
        }
    }
}

// Construct a dynamic API filter for the "project" field
function constructProjectCodeFilter() {
    return {
        title: 'Projektcode',
        options: function() {
            let project_codes = {};

            inventreeGet('/api/project-code/', {}, {
                async: false,
                success: function(response) {
                    for (let code of response) {
                        project_codes[code.pk] = {
                            key: code.pk,
                            value: code.code
                        };
                    }
                }
            });

            return project_codes;
        }
    };
}


// Construct a filter for the "has project code" field
function constructHasProjectCodeFilter() {
    return {
        type: 'bool',
        title: 'Has project code',
    };
}


// Reset a dictionary of filters for the attachment table
function getAttachmentFilters() {
    return {};
}


// Return a dictionary of filters for the return order table
function getReturnOrderFilters() {
    var filters = {
        status: {
            title: 'Order status',
            options: returnOrderCodes
        },
        outstanding: {
            type: 'bool',
            title: 'Outstanding',
        },
        overdue: {
            type: 'bool',
            title: 'Überfällig',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Assigned to me',
        },
    };

    if (global_settings.PROJECT_CODES_ENABLED) {
        filters['has_project_code'] = constructHasProjectCodeFilter();
        filters['project_code'] = constructProjectCodeFilter();
    }

    return filters;
}


// Return a dictionary of filters for the return order line item table
function getReturnOrderLineItemFilters() {
    return {
        received: {
            type: 'bool',
            title: 'Empfangen',
        },
        outcome: {
            title: 'Ergebnis',
            options: returnOrderLineItemCodes,
        }
    };
}


// Return a dictionary of filters for the variants table
function getVariantsTableFilters() {
    return {
        active: {
            type: 'bool',
            title: 'Aktiv',
        },
        template: {
            type: 'bool',
            title: 'Vorlage',
        },
        virtual: {
            type: 'bool',
            title: 'Virtuell',
        },
        trackable: {
            type: 'bool',
            title: 'Nachverfolgbar',
        },
    };
}


// Return a dictionary of filters for the BOM table
function getBOMTableFilters() {
    return {
        sub_part_trackable: {
            type: 'bool',
            title: 'Trackable Part',
        },
        sub_part_assembly: {
            type: 'bool',
            title: 'Assembled Part',
        },
        available_stock: {
            type: 'bool',
            title: 'Has Available Stock',
        },
        on_order: {
            type: 'bool',
            title: 'Bestellt',
        },
        validated: {
            type: 'bool',
            title: 'überprüft',
        },
        inherited: {
            type: 'bool',
            title: 'Wird vererbt',
        },
        allow_variants: {
            type: 'bool',
            title: 'Allow Variant Stock',
        },
        optional: {
            type: 'bool',
            title: 'Optional',
        },
        consumable: {
            type: 'bool',
            title: 'Verbrauchsmaterial',
        },
        has_pricing: {
            type: 'bool',
            title: 'Has Pricing',
        },
    };
}


// Return a dictionary of filters for the "related parts" table
function getRelatedTableFilters() {
    return {};
}


// Return a dictionary of filters for the "used in" table
function getUsedInTableFilters() {
    return {
        'inherited': {
            type: 'bool',
            title: 'Wird vererbt',
        },
        'optional': {
            type: 'bool',
            title: 'Optional',
        },
        'part_active': {
            type: 'bool',
            title: 'Aktiv',
        },
        'part_trackable': {
            type: 'bool',
            title: 'Nachverfolgbar',
        },
    };
}


// Return a dictionary of filters for the "stock location" table
function getStockLocationFilters() {
    return {
        cascade: {
            type: 'bool',
            title: 'Include sublocations',
            description: 'Include locations',
        },
        structural: {
            type: 'bool',
            title: 'Strukturell',
        },
        external: {
            type: 'bool',
            title: 'Extern',
        },
        location_type: {
            title: 'Standorttyp',
            options: function() {
                const locationTypes = {};

                inventreeGet('/api/stock/location-type/', {}, {
                    async: false,
                    success: function(response) {
                        for(const locationType of response) {
                            locationTypes[locationType.pk] = {
                                key: locationType.pk,
                                value: locationType.name,
                            }
                        }
                    }
                });

                return locationTypes;
            },
        },
        has_location_type: {
            type: 'bool',
            title: 'Has location type'
        },
    };
}


// Return a dictionary of filters for the "part category" table
function getPartCategoryFilters() {
    return {
        cascade: {
            type: 'bool',
            title: 'Include subcategories',
            description: 'Include subcategories',
        },
        structural: {
            type: 'bool',
            title: 'Strukturell',
        },
        starred: {
            type: 'bool',
            title: 'Subscribed',
        },
    };
}


// Return a dictionary of filters for the "customer stock" table
function getCustomerStockFilters() {
    return {
        serialized: {
            type: 'bool',
            title: 'Is Serialized',
        },
        serial_gte: {
            title: 'Serial number GTE',
            description: 'Serial number greater than or equal to',
        },
        serial_lte: {
            title: 'Serial number LTE',
            description: 'Serial number less than or equal to',
        },
        serial: {
            title: 'Serial number',
            description: 'Serial number',
        },
        batch: {
            title: 'Losnummer',
            description: 'Batch code',
        },
    };
}


// Return a dictionary of filters for the "stock" table
function getStockTableFilters() {
    var filters = {
        active: {
            type: 'bool',
            title: 'Active parts',
            description: 'Show stock for active parts',
        },
        assembly: {
            type: 'bool',
            title: 'Baugruppe',
            description: 'Part is an assembly',
        },
        allocated: {
            type: 'bool',
            title: 'Is allocated',
            description: 'Item has been allocated',
        },
        available: {
            type: 'bool',
            title: 'Verfügbar',
            description: 'Stock is available for use',
        },
        cascade: {
            type: 'bool',
            title: 'Include sublocations',
            description: 'Include stock in sublocations',
        },
        depleted: {
            type: 'bool',
            title: 'Depleted',
            description: 'Show stock items which are depleted',
        },
        in_stock: {
            type: 'bool',
            title: 'Auf Lager',
            description: 'Show items which are in stock',
        },
        is_building: {
            type: 'bool',
            title: 'In Produktion',
            description: 'Show items which are in production',
        },
        include_variants: {
            type: 'bool',
            title: 'Include Variants',
            description: 'Include stock items for variant parts',
        },
        installed: {
            type: 'bool',
            title: 'Installiert',
            description: 'Show stock items which are installed in another item',
        },
        sent_to_customer: {
            type: 'bool',
            title: 'Zum Kunden geschickt',
            description: 'Show items which have been assigned to a customer',
        },
        serialized: {
            type: 'bool',
            title: 'Is Serialized',
        },
        serial: {
            title: 'Serial number',
            description: 'Serial number',
        },
        serial_gte: {
            title: 'Serial number GTE',
            description: 'Serial number greater than or equal to',
        },
        serial_lte: {
            title: 'Serial number LTE',
            description: 'Serial number less than or equal to',
        },
        status: {
            options: stockCodes,
            title: 'Stock status',
            description: 'Stock status',
        },
        has_batch: {
            title: 'Has batch code',
            type: 'bool',
        },
        batch: {
            title: 'Losnummer',
            description: 'Batch code',
        },
        tracked: {
            title: 'Nachverfolgt',
            description: 'Stock item is tracked by either batch code or serial number',
            type: 'bool',
        },
        has_purchase_price: {
            type: 'bool',
            title: 'Has purchase price',
            description: 'Show stock items which have a purchase price set',
        },
        expiry_date_lte: {
            type: 'date',
            title: 'Expiry Date before',
        },
        expiry_date_gte: {
            type: 'date',
            title: 'Expiry Date after',
        },
        external: {
            type: 'bool',
            title: 'Externer Standort',
        }
    };

    // Optional filters if stock expiry functionality is enabled
    if (global_settings.STOCK_ENABLE_EXPIRY) {
        filters.expired = {
            type: 'bool',
            title: 'abgelaufen',
            description: 'Show stock items which have expired',
        };

        filters.stale = {
            type: 'bool',
            title: 'überfällig',
            description: 'Show stock which is close to expiring',
        };
    }

    return filters;
}


// Return a dictionary of filters for the "stock tests" table
function getStockTestTableFilters() {

    return {
        result: {
            type: 'bool',
            title: 'Test Passed',
        },
        include_installed: {
            type: 'bool',
            title: 'Include Installed Items',
        }
    };
}


// Return a dictionary of filters for the "stocktracking" table
function getStockTrackingTableFilters() {
    return {};
}


// Return a dictionary of filters for the "part tests" table
function getPartTestTemplateFilters() {
    return {
        required: {
            type: 'bool',
            title: 'Benötigt',
        },
        enabled: {
            type: 'bool',
            title: 'Aktiviert',
        },
    };
}


// Return a dictionary of filters for the "plugins" table
function getPluginTableFilters() {
    return {
        active: {
            type: 'bool',
            title: 'Aktiv',
        },
        builtin: {
            type: 'bool',
            title: 'Integriert',
        },
        sample: {
            type: 'bool',
            title: 'Beispiel',
        },
        installed: {
            type: 'bool',
            title: 'Installiert'
        },
    };
}


// Return a dictionary of filters for the "build" table
function getBuildTableFilters() {

    let filters = {
        status: {
            title: 'Build status',
            options: buildCodes,
        },
        active: {
            type: 'bool',
            title: 'Aktiv',
        },
        overdue: {
            type: 'bool',
            title: 'Überfällig',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Assigned to me',
        },
        assigned_to: {
            title: 'Verantwortlicher Benutzer',
            options: function() {
                var ownersList = {};
                inventreeGet('/api/user/owner/', {}, {
                    async: false,
                    success: function(response) {
                        for (var key in response) {
                            let owner = response[key];
                            ownersList[owner.pk] = {
                                key: owner.pk,
                                value: `${owner.name} (${owner.label})`,
                            };
                        }
                    }
                });
                return ownersList;
            },
        },
        issued_by: constructIssuedByFilter(),
    };

    if (global_settings.PROJECT_CODES_ENABLED) {
        filters['has_project_code'] = constructHasProjectCodeFilter();
        filters['project_code'] = constructProjectCodeFilter();
    }

    return filters;
}


function getBuildItemTableFilters() {
    return {};
}


// Return a dictionary of filters for the "build lines" table
function getBuildLineTableFilters() {
    return {
        allocated: {
            type: 'bool',
            title: 'Zugeordnet',
        },
        available: {
            type: 'bool',
            title: 'Verfügbar',
        },
        tracked: {
            type: 'bool',
            title: 'Nachverfolgt',
        },
        consumable: {
            type: 'bool',
            title: 'Verbrauchsmaterial',
        },
        optional: {
            type: 'bool',
            title: 'Optional',
        },
    };
}


// Return a dictionary of filters for the "purchase order line item" table
function getPurchaseOrderLineItemFilters() {
    return {
        pending: {
            type: 'bool',
            title: 'Ausstehend',
        },
        received: {
            type: 'bool',
            title: 'Empfangen',
        },
        order_status: {
            title: 'Order status',
            options: purchaseOrderCodes,
        },
    };
}


// Return a dictionary of filters for the "purchase order" table
function getPurchaseOrderFilters() {

    var filters = {
        status: {
            title: 'Order status',
            options: purchaseOrderCodes,
        },
        outstanding: {
            type: 'bool',
            title: 'Outstanding',
        },
        overdue: {
            type: 'bool',
            title: 'Überfällig',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Assigned to me',
        },
    };

    if (global_settings.PROJECT_CODES_ENABLED) {
        filters['has_project_code'] = constructHasProjectCodeFilter();
        filters['project_code'] = constructProjectCodeFilter();
    }

    return filters;
}


// Return a dictionary of filters for the "sales order allocation" table
function getSalesOrderAllocationFilters() {
    return {
        outstanding: {
            type: 'bool',
            title: 'Outstanding',
        }
    };
}


// Return a dictionary of filters for the "sales order" table
function getSalesOrderFilters() {
    var filters = {
        status: {
            title: 'Order status',
            options: salesOrderCodes,
        },
        outstanding: {
            type: 'bool',
            title: 'Outstanding',
        },
        overdue: {
            type: 'bool',
            title: 'Überfällig',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Assigned to me',
        },
    };

    if (global_settings.PROJECT_CODES_ENABLED) {
        filters['has_project_code'] = constructHasProjectCodeFilter();
        filters['project_code'] = constructProjectCodeFilter();
    }

    return filters;
}


// Return a dictionary of filters for the "sales order line item" table
function getSalesOrderLineItemFilters() {
    return {
        completed: {
            type: 'bool',
            title: 'Fertig',
        },
    };
}


// Return a dictionary of filters for the "supplier part" table
function getSupplierPartFilters() {
    return {
        active: {
            type: 'bool',
            title: 'Active parts',
        },
    };
}


// Return a dictionary of filters for the "part" table
function getPartTableFilters() {
    return {
        cascade: {
            type: 'bool',
            title: 'Include subcategories',
            description: 'Include parts in subcategories',
        },
        active: {
            type: 'bool',
            title: 'Aktiv',
            description: 'Show active parts',
        },
        assembly: {
            type: 'bool',
            title: 'Baugruppe',
        },
        unallocated_stock: {
            type: 'bool',
            title: 'Available stock',
        },
        component: {
            type: 'bool',
            title: 'Komponente',
        },
        has_units: {
            type: 'bool',
            title: 'Has Units',
            description: 'Part has defined units',
        },
        has_ipn: {
            type: 'bool',
            title: 'Has IPN',
            description: 'Part has internal part number',
        },
        has_stock: {
            type: 'bool',
            title: 'In stock',
        },
        low_stock: {
            type: 'bool',
            title: 'Bestand niedrig',
        },
        purchaseable: {
            type: 'bool',
            title: 'Purchasable',
        },
        salable: {
            type: 'bool',
            title: 'Verkäuflich',
        },
        starred: {
            type: 'bool',
            title: 'Subscribed',
        },
        stocktake: {
            type: 'bool',
            title: 'Has stocktake entries',
        },
        is_template: {
            type: 'bool',
            title: 'Vorlage',
        },
        trackable: {
            type: 'bool',
            title: 'Nachverfolgbar',
        },
        virtual: {
            type: 'bool',
            title: 'Virtuell',
        },
        has_pricing: {
            type: 'bool',
            title: 'Has Pricing',
        },
    };
}


// Return a dictionary of filters for the "contact" table
function getContactFilters() {
    return {};
}


// Return a dictionary of filters for the "company" table
function getCompanyFilters() {
    return {
        is_manufacturer: {
            type: 'bool',
            title: 'Hersteller',
        },
        is_supplier: {
            type: 'bool',
            title: 'Zulieferer',
        },
        is_customer: {
            type: 'bool',
            title: 'Kunde',
        },
    };
}


// Return a dictionary of filters for the "PartParameter" table
function getPartParameterFilters() {
    return {};
}


// Return a dictionary of filters for the "part parameter template" table
function getPartParameterTemplateFilters() {
    return {
        checkbox: {
            type: 'bool',
            title: 'Checkbox',
        },
        has_choices: {
            type: 'bool',
            title: 'Has Choices',
        },
        has_units: {
            type: 'bool',
            title: 'Has Units',
        }
    };
}


// Return a dictionary of filters for the "parametric part" table
function getParametricPartTableFilters() {
    let filters = getPartTableFilters();

    return filters;
}


// Return a dictionary of filters for a given table, based on the name of the table
function getAvailableTableFilters(tableKey) {

    tableKey = tableKey.toLowerCase();

    switch (tableKey) {
    case 'attachments':
        return getAttachmentFilters();
    case 'build':
        return getBuildTableFilters();
    case 'builditems':
        return getBuildItemTableFilters();
    case 'buildlines':
        return getBuildLineTableFilters();
    case 'bom':
        return getBOMTableFilters();
    case 'category':
        return getPartCategoryFilters();
    case 'company':
        return getCompanyFilters();
    case 'contact':
        return getContactFilters();
    case 'customerstock':
        return getCustomerStockFilters();
    case 'location':
        return getStockLocationFilters();
    case 'parameters':
        return getParametricPartTableFilters();
    case 'part-parameters':
        return getPartParameterFilters();
    case 'part-parameter-templates':
        return getPartParameterTemplateFilters();
    case 'parts':
        return getPartTableFilters();
    case 'parttests':
        return getPartTestTemplateFilters();
    case 'plugins':
        return getPluginTableFilters();
    case 'purchaseorder':
        return getPurchaseOrderFilters();
    case 'purchaseorderlineitem':
        return getPurchaseOrderLineItemFilters();
    case 'related':
        return getRelatedTableFilters();
    case 'returnorder':
        return getReturnOrderFilters();
    case 'returnorderlineitem':
        return getReturnOrderLineItemFilters();
    case 'salesorder':
        return getSalesOrderFilters();
    case 'salesorderallocation':
        return getSalesOrderAllocationFilters();
    case 'salesorderlineitem':
        return getSalesOrderLineItemFilters();
    case 'stock':
        return getStockTableFilters();
    case 'stocktests':
        return getStockTestTableFilters();
    case 'stocktracking':
        return getStockTrackingTableFilters();
    case 'supplierpart':
        return getSupplierPartFilters();
    case 'usedin':
        return getUsedInTableFilters();
    case 'variants':
        return getVariantsTableFilters();
    default:
        console.warn(`No filters defined for table ${tableKey}`);
        return {};
    }
}
