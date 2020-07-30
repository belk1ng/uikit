import './ChoiceGroup.css';

import React from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

import { ChoiceGroupItem } from './Item/ChoiceGroup-Item';

export const choiceGroupForms = ['default', 'brick', 'round'] as const;
export type ChoiceGroupPropForm = typeof choiceGroupForms[number];
export const choiceGroupDefaultForm: ChoiceGroupPropForm = 'default';

export const choiceGroupSizes = ['xs', 's', 'm', 'l'] as const;
export type ChoiceGroupPropSize = typeof choiceGroupSizes[number];
export const choiceGroupDefaultSize: ChoiceGroupPropSize = 'm';

export const choiceGroupViews = ['primary', 'ghost', 'secondary'] as const;
export type ChoiceGroupPropView = typeof choiceGroupViews[number];
export const choiceGroupDefaultView: ChoiceGroupPropView = 'primary';

export type ChoiceGroupPropGetLabel<ITEM> = (item: ITEM) => string | number;
export type ChoiceGroupPropGetTitle<ITEM> = (item: ITEM) => string | number;
export type ChoiceGroupPropGetIcon<ITEM> = (item: ITEM) => React.FC<IconProps> | undefined;

type CommonProps<ITEM> = {
  size?: ChoiceGroupPropSize;
  form?: ChoiceGroupPropForm;
  view?: ChoiceGroupPropView;
  onlyIcon?: boolean;
  iconSize?: IconPropSize;
  items: ITEM[];
  getLabel: ChoiceGroupPropGetLabel<ITEM>;
  getIcon?: ChoiceGroupPropGetIcon<ITEM>;
  name: string;
  children?: never;
};

type PropsWithMultiple<ITEM> = {
  value?: ITEM[] | null;
  multiple: true;
  onChange: (props: { e: React.ChangeEvent<HTMLInputElement>; value: ITEM[] | null }) => void;
};

type PropsWithoutMultiple<ITEM> = {
  value?: ITEM | null;
  multiple: false;
  onChange: (props: { e: React.ChangeEvent<HTMLInputElement>; value: ITEM | null }) => void;
};

type Props<ITEM = any> = PropsWithHTMLAttributesAndRef<
  CommonProps<ITEM> & (PropsWithMultiple<ITEM> | PropsWithoutMultiple<ITEM>),
  HTMLDivElement
>;

type ChoiceGroup = <ITEM>(props: Props<ITEM>) => React.ReactElement | null;

const sizeMap: Record<ChoiceGroupPropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 'm',
};

export const cnChoiceGroup = cn('ChoiceGroup');

export const ChoiceGroup: ChoiceGroup = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    size = choiceGroupDefaultSize,
    form = choiceGroupDefaultForm,
    view = choiceGroupDefaultView,
    onlyIcon,
    iconSize: iconSizeProp,
    value,
    multiple = false,
    items,
    getLabel,
    onChange,
    getIcon,
    name,
    className,
    ...otherProps
  } = props;

  const { getOnChange, getChecked } = useChoiceGroup<
    typeof items[number],
    React.ChangeEvent<HTMLInputElement>
  >({
    value,
    getKey: getLabel,
    callBack: onChange,
    multiple,
  });

  const iconSize = getSizeByMap(sizeMap, size, iconSizeProp);

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cnChoiceGroup({ size, form, view, onlyIcon }, [className])}
    >
      {items.map((item: unknown) => (
        <ChoiceGroupItem
          key={getLabel(item)}
          onChange={getOnChange(item)}
          checked={getChecked(item)}
          label={getLabel(item).toString()}
          icon={getIcon && getIcon(item)}
          iconSize={iconSize}
          multiple={multiple}
          onlyIcon={onlyIcon}
          name={name}
        />
      ))}
    </div>
  );
});
