/**
 * Original seen in [shoelace](https://github.com/shoelace-style/shoelace/blob/next/src/internal/scroll.ts)
 *
 * Useful for modal windows.
 */

const locks = new Set()

/**
 * @returns The width of the document's scrollbar
 */
function getScrollbarWidth () {
    const documentWidth = document.documentElement.clientWidth
    return Math.abs(window.innerWidth - documentWidth)
}

/**
 * Used in conjunction with `scrollbarWidth` to set proper body padding in case
 * the user has padding already on the `<body>` element.
 */
function getExistingBodyPadding () {
    const padding = Number(getComputedStyle(document.body)
        .paddingRight.replace(/px/, '')
    )

    if (isNaN(padding) || !padding) {
        return 0
    }

    return padding
}

/**
 * Prevents body scrolling. Keeps track of which elements requested a lock so
 * multiple levels of locking are possible
 * without premature unlocking.
 *
 * Useful for modal windows.
 */
export function lockBodyScrolling (lockingEl:HTMLElement):void {
    locks.add(lockingEl)

    // When the first lock is created, set the scroll lock size to match the
    // scrollbar's width to prevent content from
    // shifting. We only do this on the first lock because the scrollbar width
    // will measure zero after overflow is hidden.
    if (!document.documentElement.classList.contains('scroll-lock')) {
        /**
         * Scrollbar width + body padding calculation can go away once Safari
         * has scrollbar-gutter support.
         * */
        // must be measured before the `scroll-lock` class is applied
        const scrollbarWidth = getScrollbarWidth() + getExistingBodyPadding()

        let scrollbarGutterProperty = (getComputedStyle(document.documentElement)
            .scrollbarGutter)

        // default is auto, unsupported browsers is "undefined"
        if (!scrollbarGutterProperty || scrollbarGutterProperty === 'auto') {
            scrollbarGutterProperty = 'stable'
        }

        /** Sometimes the scrollbar width is 1px, even then, we assume nothing
         * is overflowing. */
        if (scrollbarWidth < 2) {
            // if there's no scrollbar, just set it to an empty string so
            // whatever the user has set gets used. This is useful if the page
            // is not overflowing and showing a scrollbar, or if the user has
            // overflow: hidden, or any other reason a scrollbar may not
            // be showing.
            scrollbarGutterProperty = ''
        }

        document.documentElement.style.setProperty(
            '--scroll-lock-gutter',
            scrollbarGutterProperty
        )
        document.documentElement.classList.add('scroll-lock')
        document.documentElement.style.setProperty(
            '--scroll-lock-size',
            `${scrollbarWidth}px`
        )
    }
}

/**
 * Unlocks body scrolling. Scrolling will only be unlocked once all elements
 * that requested a lock call this method.
 */
export function unlockBodyScrolling (lockingEl:HTMLElement):void {
    locks.delete(lockingEl)

    if (locks.size === 0) {
        document.documentElement.classList.remove('scroll-lock')
        document.documentElement.style.removeProperty('--scroll-lock-size')
    }
}
