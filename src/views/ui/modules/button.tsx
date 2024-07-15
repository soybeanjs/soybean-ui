import { SuButton } from '@soybean-unify/ui';
import type { ButtonColor, ButtonSize, ButtonVariant } from '@soybean-unify/ui';
import { Airplay, Loader, LoaderCircle } from 'lucide-vue-next';

const colors: ButtonColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary'];
const variants: ButtonVariant[] = ['solid', 'pure', 'outline', 'dashed', 'ghost', 'text', 'link'];
const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg'];

const UiButton = () => (
  <>
    <div class="py-12px text-18px">Color</div>
    <div class="flex flex-wrap gap-12px">
      {colors.map(color => (
        <SuButton color={color}>{color}</SuButton>
      ))}
    </div>
    <div class="py-12px text-18px">Variant</div>
    <div class="flex-col-stretch gap-12px">
      {colors.map(color => (
        <div class="flex flex-wrap gap-12px">
          {variants.map(variant => (
            <SuButton color={color} variant={variant}>
              {variant}
            </SuButton>
          ))}
        </div>
      ))}
    </div>
    <div class="py-12px text-18px">Size</div>
    <div class="flex flex-wrap gap-12px">
      {sizes.map((size, index) => (
        <SuButton color={colors[index]} variant={variants[index]} size={size}>
          {size}
        </SuButton>
      ))}
    </div>
    <div class="py-12px text-18px">Shape</div>
    <div class="flex flex-wrap gap-12px">
      <SuButton color="primary" variant="outline" shape="rounded">
        rounded
      </SuButton>
      <div class="flex-col-center">
        <SuButton color="destructive" variant="dashed" shape="square">
          <Airplay size={16} />
        </SuButton>
        <div class="text-12px text-#666">square</div>
      </div>
      <div class="flex-col-center">
        <SuButton color="success" variant="ghost" shape="circle">
          <Airplay size={16} />
        </SuButton>
        <div class="text-12px text-#666">circle</div>
      </div>
    </div>
    <div class="py-12px text-18px">Slot</div>
    <div class="flex flex-wrap gap-12px">
      <SuButton color="primary">
        <Airplay size={16} />
        before
      </SuButton>
      <SuButton color="destructive" variant="outline">
        after
        <Airplay size={16} />
      </SuButton>
      <SuButton
        color="success"
        variant="dashed"
        v-slots={{
          before: () => <Airplay size={16} />,
          after: () => <Airplay size={16} />
        }}
      >
        both
      </SuButton>
    </div>
    <div class="py-12px text-18px">Disabled</div>
    <div class="flex flex-wrap gap-12px">
      <SuButton color="destructive" variant="outline" disabled>
        disabled
      </SuButton>
      <SuButton color="success" variant="dashed" disabled>
        disabled
      </SuButton>
      <SuButton color="warning" variant="ghost" disabled>
        disabled
      </SuButton>
    </div>
    <div class="py-12px text-18px">Loading</div>
    <div class="flex flex-wrap gap-12px">
      <SuButton
        color="success"
        variant="solid"
        disabled
        v-slots={{
          before: () => <LoaderCircle size={16} class="animate-spin" />
        }}
      >
        Loading
      </SuButton>
      <SuButton
        color="warning"
        variant="outline"
        disabled
        v-slots={{
          before: () => <Loader size={16} class="animate-spin" />
        }}
      >
        Loading
      </SuButton>
    </div>
  </>
);

export default UiButton;
