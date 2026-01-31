import type { ComponentProps, ComponentType } from "react";

export const WithVariants = <T extends ComponentType<Record<string, unknown>>>(
	Component: T,
	variants: Partial<ComponentProps<T>>[],
) => (props: Partial<ComponentProps<T>>) => {
	return (
		<div className="flex flex-wrap gap-4 w-full">
			{variants.map((variant) => {
				const ComponentWithProps = Component as ComponentType<
					ComponentProps<T> & { key?: string }
				>;
				const key = JSON.stringify(variant);
				return (
					<ComponentWithProps
						key={key}
						{...{
							...variant,
							...props,
						} as ComponentProps<T>}
					/>
				);
			})}
		</div>
	);
};
