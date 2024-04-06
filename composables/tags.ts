import type { ITag } from '~/types';

export function useTags() {
    const tags = ref<ITag[]>([]);
    const loadingTags = ref(true);
    const getTags = async (): Promise<void> => {
        loadingTags.value = true;
        await delay(3);

        tags.value = (await import('~/stack.json')).default
        loadingTags.value = false;
    }

    return {
        tags,
        getTags,
        loadingTags
    }
}