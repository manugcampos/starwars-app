from typing import List, Dict, Any, Callable

# Search by name (case-insensitive, partial match)
def filter_by_name(items: List[Dict[str, Any]], name: str) -> List[Dict[str, Any]]:
    if not name:
        return items
    name = name.lower()
    return [item for item in items if name in item.get("name", "").lower()]

# Extensible sorting strategy
def sort_items(items: List[Dict[str, Any]], sort_by: str, order: str, sorters: Dict[str, Callable]) -> List[Dict[str, Any]]:
    reverse = order == "desc"
    sorter = sorters.get(sort_by, lambda x: x.get("name", ""))
    return sorted(items, key=sorter, reverse=reverse)

# Manual pagination
def paginate(items: List[Dict[str, Any]], page: int, page_size: int) -> List[Dict[str, Any]]:
    start = (page - 1) * page_size
    end = start + page_size
    return items[start:end] 