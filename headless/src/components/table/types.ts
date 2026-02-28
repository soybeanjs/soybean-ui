import { ThHTMLAttributes, TdHTMLAttributes, TableHTMLAttributes, HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';

export interface TableRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableContentProps extends /** @vue-ignore */ TableHTMLAttributes {}

export interface TableHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableBodyProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableFooterProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableRowProps extends /** @vue-ignore */ HTMLAttributes {}

export interface TableHeadProps extends /** @vue-ignore */ ThHTMLAttributes {}

export interface TableCellProps extends /** @vue-ignore */ TdHTMLAttributes {}

export type TableUiSlot = 'root' | 'content' | 'header' | 'body' | 'footer' | 'row' | 'head' | 'cell';

export type TableUi = UiClass<TableUiSlot>;
