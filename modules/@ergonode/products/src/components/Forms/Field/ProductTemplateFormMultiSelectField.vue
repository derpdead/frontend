/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductTemplateFormField
        :size="size"
        :position="position">
        <TranslationSelect
            :value="localValue"
            :clearable="true"
            :multiselect="true"
            :label="label"
            :options="options"
            :placeholder="properties.placeholder"
            :error-messages="errors[fieldKey]"
            :required="properties.required"
            :disabled="disabled"
            @focus="onFocus"
            @input="onValueChange">
            <template #append>
                <InfoHint
                    v-if="properties.hint"
                    :hint="properties.hint" />
            </template>
            <template #details>
                <div />
            </template>
        </TranslationSelect>
    </ProductTemplateFormField>
</template>

<script>
import InfoHint from '@Core/components/Hints/InfoHint';
import TranslationSelect from '@Core/components/Select/TranslationSelect';
import {
    arraysAreEqual,
} from '@Core/models/arrayWrapper';
import {
    getMappedMatchedArrayOptions,
    getMappedObjectOptions,
} from '@Core/models/mappers/translationsMapper';
import ProductTemplateFormField from '@Products/components/Forms/Field/ProductTemplateFormField';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateFormMultiSelectField',
    components: {
        ProductTemplateFormField,
        TranslationSelect,
        InfoHint,
    },
    props: {
        size: {
            type: Object,
            default: () => ({}),
        },
        position: {
            type: Object,
            default: () => ({}),
        },
        properties: {
            type: Object,
            default: () => ({}),
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
        languageCode: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            localValue: '',
        };
    },
    computed: {
        ...mapState('product', [
            'draft',
        ]),
        fieldKey() {
            return `${this.properties.attribute_code}/${this.languageCode}`;
        },
        hasOptions() {
            return typeof this.properties.options !== 'undefined';
        },
        options() {
            if (!this.hasOptions) return [];

            return getMappedObjectOptions({
                options: this.properties.options,
                languageCode: this.languageCode,
            });
        },
        fieldData() {
            const {
                attribute_code,
            } = this.properties;
            const value = this.draft[this.languageCode][attribute_code];

            if (!this.hasOptions || !value) {
                return [];
            }

            return getMappedMatchedArrayOptions({
                optionIds: value,
                options: this.properties.options,
                languageCode: this.languageCode,
            });
        },
    },
    watch: {
        languageCode: {
            immediate: true,
            handler() {
                this.localValue = this.fieldData;
            },
        },
    },
    methods: {
        onFocus(isFocused) {
            if (!isFocused && !arraysAreEqual(this.fieldData, this.localValue)) {
                this.$emit('input', {
                    fieldKey: this.fieldKey,
                    languageCode: this.languageCode,
                    productId: this.$route.params.id,
                    elementId: this.properties.attribute_id,
                    code: this.properties.attribute_code,
                    value: this.localValue.map(({
                        id,
                    }) => id),
                });
            }
        },
        onValueChange(value) {
            this.localValue = value;
        },
    },
};
</script>