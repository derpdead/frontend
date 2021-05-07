/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    WorkflowStatusTransitions: () => import('@Workflow/pages/workflow/index').then(m => m.default || m),
    WorkflowStatusEdit: () => import('@Workflow/pages/workflow/_status/_id').then(m => m.default || m),
};

export const Tabs = {
    WorkflowDesignerTab: () => import('@Workflow/components/Tabs/WorkflowDesignerTab').then(m => m.default || m),
    WorkflowStatusGeneralTab: () => import('@Workflow/components/Tabs/WorkflowStatusGeneralTab').then(m => m.default || m),
    WorkflowStatusTranslationsTab: () => import('@Workflow/components/Tabs/WorkflowStatusTranslationsTab').then(m => m.default || m),
};

export const Icons = {
    Flow: () => import('@Core/components/Icons/Menu/IconFlow').then(m => m.default || m),
};
