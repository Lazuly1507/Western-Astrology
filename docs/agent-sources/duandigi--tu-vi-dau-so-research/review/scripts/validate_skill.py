#!/usr/bin/env python3
"""Validate an Agent Skill folder against core structural rules."""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:  # pragma: no cover
    yaml = None

NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")


def parse_frontmatter(text: str) -> tuple[dict, str]:
    if not text.startswith("---\n"):
        raise ValueError("SKILL.md phải bắt đầu bằng YAML frontmatter và dòng ---")
    end = text.find("\n---\n", 4)
    if end == -1:
        raise ValueError("Không tìm thấy dòng đóng YAML frontmatter ---")
    raw = text[4:end]
    body = text[end + 5 :]
    if yaml is None:
        data = {}
        for line in raw.splitlines():
            if ":" in line and not line.startswith(" "):
                key, value = line.split(":", 1)
                data[key.strip()] = value.strip().strip('"\'')
    else:
        data = yaml.safe_load(raw)
    if not isinstance(data, dict):
        raise ValueError("YAML frontmatter phải là object/map")
    return data, body


def validate(root: Path) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    skill_path = root / "SKILL.md"
    if not skill_path.is_file():
        return [f"Thiếu {skill_path}"], warnings

    text = skill_path.read_text(encoding="utf-8")
    try:
        meta, body = parse_frontmatter(text)
    except Exception as exc:
        return [str(exc)], warnings

    name = meta.get("name")
    description = meta.get("description")
    if not isinstance(name, str) or not name:
        errors.append("Thiếu trường name")
    else:
        if len(name) > 64:
            errors.append("name dài hơn 64 ký tự")
        if not NAME_RE.fullmatch(name):
            errors.append("name chỉ được chứa chữ thường a-z, số và dấu gạch nối đơn")
        if name != root.name:
            errors.append(f"name '{name}' không khớp tên thư mục '{root.name}'")

    if not isinstance(description, str) or not description.strip():
        errors.append("Thiếu description")
    elif len(description) > 1024:
        errors.append("description dài hơn 1024 ký tự")

    compatibility = meta.get("compatibility")
    if compatibility is not None and (not isinstance(compatibility, str) or len(compatibility) > 500):
        errors.append("compatibility phải là chuỗi không quá 500 ký tự")

    metadata = meta.get("metadata")
    if metadata is not None:
        if not isinstance(metadata, dict):
            errors.append("metadata phải là map")
        elif any(not isinstance(k, str) or not isinstance(v, str) for k, v in metadata.items()):
            errors.append("metadata chỉ nên chứa cặp string:string")

    if not body.strip():
        errors.append("Phần Markdown của SKILL.md đang trống")

    line_count = len(text.splitlines())
    if line_count > 500:
        warnings.append(f"SKILL.md có {line_count} dòng; chuẩn khuyến nghị dưới 500 dòng")

    for target in LINK_RE.findall(body):
        target = target.split("#", 1)[0]
        if not target or re.match(r"^[a-z]+://", target) or target.startswith("mailto:"):
            continue
        path = (root / target).resolve()
        try:
            path.relative_to(root.resolve())
        except ValueError:
            errors.append(f"Liên kết đi ra ngoài thư mục skill: {target}")
            continue
        if not path.exists():
            errors.append(f"Liên kết nội bộ không tồn tại: {target}")

    for required in ["references", "assets"]:
        if not (root / required).is_dir():
            warnings.append(f"Không có thư mục tùy chọn {required}/")

    return errors, warnings


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", nargs="?", default=".", help="Đường dẫn thư mục skill")
    args = parser.parse_args()
    root = Path(args.root).expanduser().resolve()
    errors, warnings = validate(root)
    for item in warnings:
        print(f"WARNING: {item}")
    for item in errors:
        print(f"ERROR: {item}")
    if errors:
        print(f"FAILED: {len(errors)} lỗi, {len(warnings)} cảnh báo")
        return 1
    print(f"OK: skill hợp lệ theo các kiểm tra cốt lõi ({len(warnings)} cảnh báo)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
