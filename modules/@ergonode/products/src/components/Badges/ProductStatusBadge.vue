/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InformationBadge
        :background="status.color"
        :color="textColor"
        :shadow="true"
        :title="status.label" />
</template>

<script>
import {
    GRAPHITE_DARK,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import InformationBadge from '@UI/components/Badges/InformationBadge';
import {
    calculateContrastRatio,
    calculateRelativeLuminance,
    hexToRGB,
} from '@UI/models/color';

export default {
    name: 'ProductStatusBadge',
    components: {
        InformationBadge,
    },
    props: {
        status: {
            type: Object,
            required: true,
        },
    },
    computed: {
        textColor() {
            const convertedRgbText = hexToRGB(WHITE);
            const convertedRgbBg = hexToRGB(this.status.color);
            const relativeLuminance = calculateRelativeLuminance(convertedRgbText);
            const relativeLuminanceBackground = calculateRelativeLuminance(convertedRgbBg);
            const contrastRatio = calculateContrastRatio(
                relativeLuminance,
                relativeLuminanceBackground,
            );

            return contrastRatio > 4.5 ? WHITE : GRAPHITE_DARK;
        },
    },
};
</script>
