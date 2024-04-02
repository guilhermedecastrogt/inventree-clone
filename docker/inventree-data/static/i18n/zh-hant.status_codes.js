



/* globals
*/

/* exported
    buildStatusDisplay,
    purchaseOrderStatusDisplay,
    returnOrderStatusDisplay,
    returnOrderLineItemStatusDisplay,
    salesOrderStatusDisplay,
    stockHistoryStatusDisplay,
    stockStatusDisplay,
*/


/*
 * Generic function to render a status label
 */
function renderStatusLabel(key, codes, options={}) {

    let text = null;
    let label = null;

    // Find the entry which matches the provided key
    for (var name in codes) {
        let entry = codes[name];

        if (entry.key == key) {
            text = entry.value;
            label = entry.label;
            break;
        }
    }

    if (!text) {
        console.error(`renderStatusLabel could not find match for code ${key}`);
    }

    // Fallback for color
    label = label || 'bg-dark';

    if (!text) {
        text = key;
    }

    let classes = `badge rounded-pill ${label}`;

    if (options.classes) {
        classes += ` ${options.classes}`;
    }

    return `<span class='${classes}'>${text}</span>`;
}



/*
 * Status codes for the stock model.
 * Generated from the values specified in "status_codes.py"
 */
const stockCodes = {
    
    'OK': {
        key: 10,
        value: 'OK',
        label: 'bg-success',
    },
    
    'ATTENTION': {
        key: 50,
        value: '需要注意',
        label: 'bg-warning',
    },
    
    'DAMAGED': {
        key: 55,
        value: '已破損',
        label: 'bg-warning',
    },
    
    'DESTROYED': {
        key: 60,
        value: '已損毀',
        label: 'bg-danger',
    },
    
    'REJECTED': {
        key: 65,
        value: '已拒絕',
        label: 'bg-danger',
    },
    
    'LOST': {
        key: 70,
        value: '已遺失',
        label: 'bg-dark',
    },
    
    'QUARANTINED': {
        key: 75,
        value: '已隔離',
        label: 'bg-info',
    },
    
    'RETURNED': {
        key: 85,
        value: '已退回',
        label: 'bg-warning',
    },
    
};

/*
 * Render the status for a stock object.
 * Uses the values specified in "status_codes.py"
 */
function stockStatusDisplay(key, options={}) {
    return renderStatusLabel(key, stockCodes, options);
}



/*
 * Status codes for the stockHistory model.
 * Generated from the values specified in "status_codes.py"
 */
const stockHistoryCodes = {
    
    'LEGACY': {
        key: 0,
        value: '舊庫存追蹤項目',
        label: 'bg-secondary',
    },
    
    'CREATED': {
        key: 1,
        value: '已建立庫存項目',
        label: 'bg-secondary',
    },
    
    'EDITED': {
        key: 5,
        value: '編輯庫存項目',
        label: 'bg-secondary',
    },
    
    'ASSIGNED_SERIAL': {
        key: 6,
        value: '已指派的序號',
        label: 'bg-secondary',
    },
    
    'STOCK_COUNT': {
        key: 10,
        value: '已清點',
        label: 'bg-secondary',
    },
    
    'STOCK_ADD': {
        key: 11,
        value: '已手動加入庫存',
        label: 'bg-secondary',
    },
    
    'STOCK_REMOVE': {
        key: 12,
        value: '已手動移除庫存',
        label: 'bg-secondary',
    },
    
    'STOCK_MOVE': {
        key: 20,
        value: '倉儲地點已變更',
        label: 'bg-secondary',
    },
    
    'STOCK_UPDATE': {
        key: 25,
        value: '庫存已更新',
        label: 'bg-secondary',
    },
    
    'INSTALLED_INTO_ASSEMBLY': {
        key: 30,
        value: '已安裝到組件',
        label: 'bg-secondary',
    },
    
    'REMOVED_FROM_ASSEMBLY': {
        key: 31,
        value: '已從組件移除',
        label: 'bg-secondary',
    },
    
    'INSTALLED_CHILD_ITEM': {
        key: 35,
        value: '已安裝的組件項目',
        label: 'bg-secondary',
    },
    
    'REMOVED_CHILD_ITEM': {
        key: 36,
        value: '已移除的組件項目',
        label: 'bg-secondary',
    },
    
    'SPLIT_FROM_PARENT': {
        key: 40,
        value: '從上層元素分拆',
        label: 'bg-secondary',
    },
    
    'SPLIT_CHILD_ITEM': {
        key: 42,
        value: '分拆下層元素',
        label: 'bg-secondary',
    },
    
    'MERGED_STOCK_ITEMS': {
        key: 45,
        value: '已合併的庫存項目',
        label: 'bg-secondary',
    },
    
    'CONVERTED_TO_VARIANT': {
        key: 48,
        value: '已轉換成變體',
        label: 'bg-secondary',
    },
    
    'BUILD_OUTPUT_CREATED': {
        key: 50,
        value: '工單產出已建立',
        label: 'bg-secondary',
    },
    
    'BUILD_OUTPUT_COMPLETED': {
        key: 55,
        value: '工單產出已完成',
        label: 'bg-secondary',
    },
    
    'BUILD_OUTPUT_REJECTED': {
        key: 56,
        value: '工單產出已拒絕',
        label: 'bg-secondary',
    },
    
    'BUILD_CONSUMED': {
        key: 57,
        value: '被工單消耗的',
        label: 'bg-secondary',
    },
    
    'SHIPPED_AGAINST_SALES_ORDER': {
        key: 60,
        value: '按銷售訂單出貨',
        label: 'bg-secondary',
    },
    
    'RECEIVED_AGAINST_PURCHASE_ORDER': {
        key: 70,
        value: '按採購訂單接收',
        label: 'bg-secondary',
    },
    
    'RETURNED_AGAINST_RETURN_ORDER': {
        key: 80,
        value: '按退貨訂單退回',
        label: 'bg-secondary',
    },
    
    'SENT_TO_CUSTOMER': {
        key: 100,
        value: '寄送給客戶',
        label: 'bg-secondary',
    },
    
    'RETURNED_FROM_CUSTOMER': {
        key: 105,
        value: '從客戶端退回',
        label: 'bg-secondary',
    },
    
};

/*
 * Render the status for a stockHistory object.
 * Uses the values specified in "status_codes.py"
 */
function stockHistoryStatusDisplay(key, options={}) {
    return renderStatusLabel(key, stockHistoryCodes, options);
}



/*
 * Status codes for the build model.
 * Generated from the values specified in "status_codes.py"
 */
const buildCodes = {
    
    'PENDING': {
        key: 10,
        value: '待處理',
        label: 'bg-secondary',
    },
    
    'PRODUCTION': {
        key: 20,
        value: '生產',
        label: 'bg-primary',
    },
    
    'CANCELLED': {
        key: 30,
        value: '已取消',
        label: 'bg-danger',
    },
    
    'COMPLETE': {
        key: 40,
        value: '已完成',
        label: 'bg-success',
    },
    
};

/*
 * Render the status for a build object.
 * Uses the values specified in "status_codes.py"
 */
function buildStatusDisplay(key, options={}) {
    return renderStatusLabel(key, buildCodes, options);
}



/*
 * Status codes for the purchaseOrder model.
 * Generated from the values specified in "status_codes.py"
 */
const purchaseOrderCodes = {
    
    'PENDING': {
        key: 10,
        value: '待處理',
        label: 'bg-secondary',
    },
    
    'PLACED': {
        key: 20,
        value: '已下單',
        label: 'bg-primary',
    },
    
    'COMPLETE': {
        key: 30,
        value: '已完成',
        label: 'bg-success',
    },
    
    'CANCELLED': {
        key: 40,
        value: '已取消',
        label: 'bg-danger',
    },
    
    'LOST': {
        key: 50,
        value: '已遺失',
        label: 'bg-warning',
    },
    
    'RETURNED': {
        key: 60,
        value: '已退回',
        label: 'bg-warning',
    },
    
};

/*
 * Render the status for a purchaseOrder object.
 * Uses the values specified in "status_codes.py"
 */
function purchaseOrderStatusDisplay(key, options={}) {
    return renderStatusLabel(key, purchaseOrderCodes, options);
}



/*
 * Status codes for the salesOrder model.
 * Generated from the values specified in "status_codes.py"
 */
const salesOrderCodes = {
    
    'PENDING': {
        key: 10,
        value: '待處理',
        label: 'bg-secondary',
    },
    
    'IN_PROGRESS': {
        key: 15,
        value: '進行中',
        label: 'bg-primary',
    },
    
    'SHIPPED': {
        key: 20,
        value: '已出貨',
        label: 'bg-success',
    },
    
    'CANCELLED': {
        key: 40,
        value: '已取消',
        label: 'bg-danger',
    },
    
    'LOST': {
        key: 50,
        value: '已遺失',
        label: 'bg-warning',
    },
    
    'RETURNED': {
        key: 60,
        value: '已退回',
        label: 'bg-warning',
    },
    
};

/*
 * Render the status for a salesOrder object.
 * Uses the values specified in "status_codes.py"
 */
function salesOrderStatusDisplay(key, options={}) {
    return renderStatusLabel(key, salesOrderCodes, options);
}



/*
 * Status codes for the returnOrder model.
 * Generated from the values specified in "status_codes.py"
 */
const returnOrderCodes = {
    
    'PENDING': {
        key: 10,
        value: '待處理',
        label: 'bg-secondary',
    },
    
    'IN_PROGRESS': {
        key: 20,
        value: '進行中',
        label: 'bg-primary',
    },
    
    'COMPLETE': {
        key: 30,
        value: '已完成',
        label: 'bg-success',
    },
    
    'CANCELLED': {
        key: 40,
        value: '已取消',
        label: 'bg-danger',
    },
    
};

/*
 * Render the status for a returnOrder object.
 * Uses the values specified in "status_codes.py"
 */
function returnOrderStatusDisplay(key, options={}) {
    return renderStatusLabel(key, returnOrderCodes, options);
}



/*
 * Status codes for the returnOrderLineItem model.
 * Generated from the values specified in "status_codes.py"
 */
const returnOrderLineItemCodes = {
    
    'PENDING': {
        key: 10,
        value: '待處理',
        label: 'bg-secondary',
    },
    
    'RETURN': {
        key: 20,
        value: '退回',
        label: 'bg-success',
    },
    
    'REPAIR': {
        key: 30,
        value: '維修',
        label: 'bg-primary',
    },
    
    'REPLACE': {
        key: 40,
        value: '替換',
        label: 'bg-warning',
    },
    
    'REFUND': {
        key: 50,
        value: '退款',
        label: 'bg-info',
    },
    
    'REJECT': {
        key: 60,
        value: '拒絕',
        label: 'bg-danger',
    },
    
};

/*
 * Render the status for a returnOrderLineItem object.
 * Uses the values specified in "status_codes.py"
 */
function returnOrderLineItemStatusDisplay(key, options={}) {
    return renderStatusLabel(key, returnOrderLineItemCodes, options);
}

