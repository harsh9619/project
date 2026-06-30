# Debounced User Search (React + Redux Toolkit + TypeScript)

A small, runnable Vite project.

## Setup
```bash
npm install
npm run dev
```
Then open the printed local URL in your browser.

## Files
- `src/store.ts` — Redux store + typed `useAppDispatch`/`useAppSelector` hooks.
- `src/usersSlice.ts` — Redux Toolkit slice (`items`, `status`, `error`, `searchTerm`) and the `fetchUsers` thunk hitting `https://jsonplaceholder.typicode.com/users`.
- `src/useDebouncedValue.ts` — generic 300ms debounce hook.
- `src/UserRow.tsx` — single list row, wrapped in `React.memo`.
- `src/UserSearch.tsx` — input, debounced filtering, loading/error states.
- `src/App.tsx` — wires up the `<Provider>`.
- `src/main.tsx` — Vite/React entry point.
- `src/styles.css` — minimal styling.

## How the debounce + Redux flow works
1. The `<input>` is bound to local component state, so typing feels instant and doesn't dispatch on every keystroke.
2. `useDebouncedValue(inputValue, 300)` only updates 300ms after typing stops.
3. A `useEffect` dispatches `setSearchTerm` to Redux once the debounced value settles.
4. `fetchUsers` runs once on mount, tracked via `status: 'idle' | 'loading' | 'succeeded' | 'failed'`.

## Re-render optimizations
- Local vs. global state split (keystrokes stay local).
- `useMemo` for filtering, recomputed only when `items`/`searchTerm` change.
- `useCallback` for the input handler.
- `React.memo` on `UserRow` so unaffected rows skip re-rendering.
- Granular `useAppSelector` reads.
