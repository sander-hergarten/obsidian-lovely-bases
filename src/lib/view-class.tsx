import { BasesView, Keymap, type QueryController } from "obsidian";
import React from "react";
import { createRoot, type Root } from "react-dom/client";

import { ObsidianProvider } from "@/components/Obsidian/Context";
import type { ReactBaseViewProps } from "@/types";

export class ReactBasesView extends BasesView {
	private containerEl: HTMLElement;
	private root: Root;

	constructor(
		public readonly type: string,
		// biome-ignore lint/correctness/noUnusedPrivateClassMembers: Used on onDataUpdated
		private readonly Component: React.ComponentType<ReactBaseViewProps>,
		controller: QueryController,
		private readonly parentEl: HTMLElement,
	) {
		super(controller);
		this.containerEl = parentEl.createDiv(`bases-${this.type}-view-container`);
	}

	public onDataUpdated(): void {
		const { Component } = this;

		// Only create the root once - reuse it for subsequent updates
		if (!this.root) {
			this.root = createRoot(this.containerEl);
		}

		const isDevelopment = process.env.NODE_ENV === "development";
    const isEmbedded = this.isEmbedded();

    const onEntryClick = (entryId: string, event: React.MouseEvent | React.KeyboardEvent) => {
      const evt = event.nativeEvent;
      if (evt instanceof MouseEvent && evt.button !== 0 && evt.button !== 1) return;
      if (evt instanceof KeyboardEvent && evt.key !== "Enter" && evt.key !== " ") return;

      evt.preventDefault();
      const modEvent = Keymap.isModEvent(evt);
      void this.app.workspace.openLinkText(entryId, "", modEvent);
    }
    const onEntryHover = (entryId: string, linkRef: React.RefObject<HTMLAnchorElement>, event: React.MouseEvent | React.KeyboardEvent) => {
      this.app.workspace.trigger("hover-link", {
        event: event.nativeEvent,
        source: "bases",
        hoverParent: this.parentEl,
        targetEl: linkRef.current,
        linktext: entryId,
      });
    }

		const content = (
			<ObsidianProvider
				value={{
					app: this.app,
					component: this,
					containerEl: this.parentEl,
					isEmbedded,
				}}
			>
				<Component
					config={this.config}
					data={this.data}
					isEmbedded={isEmbedded}
					onEntryClick={onEntryClick}
					onEntryHover={onEntryHover}
				/>
			</ObsidianProvider>
		);

		this.root.render(isDevelopment ? <React.StrictMode>{content}</React.StrictMode> : content);
	}

	public onunload(): void {
		this.root?.unmount();
		this.containerEl.empty();
	}

  private isEmbedded(): boolean {
    const leafContent = this.containerEl.closest<HTMLElement>(".workspace-leaf-content");
    const leafType = leafContent?.dataset?.type;

    if (leafType) {
      return leafType !== 'bases';
    }

    return !!this.containerEl.closest(
			".internal-embed, .markdown-embed, .cm-embed-block, .markdown-embed-content",
		);
  }
}
