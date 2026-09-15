import os
import shutil
import glob
import re

base_dir = "e:/Nai's Activity/Magang PLN Pusertif/DigitalLibrary-PLNPusertif"
amel_dir = os.path.join(base_dir, "_staging/desain_amel/src")
nadia_dir = os.path.join(base_dir, "_staging/desain_nadia/src")
js_dir = os.path.join(base_dir, "resources/js")

components_amel_dir = os.path.join(amel_dir, "Components")
components_nadia_dir = os.path.join(nadia_dir, "components")
pages_amel_dir = os.path.join(amel_dir, "Pages")
pages_nadia_dir = os.path.join(nadia_dir, "Pages")

dest_components = os.path.join(js_dir, "Components")
dest_pages_amel = os.path.join(js_dir, "Pages")
dest_pages_nadia = os.path.join(js_dir, "Pages/Public")

def get_all_files(directory):
    file_paths = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx') or file.endswith('.js') or file.endswith('.css'):
                file_paths.append(os.path.relpath(os.path.join(root, file), directory))
    return file_paths

amel_components = get_all_files(components_amel_dir)
nadia_components = get_all_files(components_nadia_dir)

conflicts = []
shared_components = set(amel_components).intersection(set(nadia_components))

for comp in shared_components:
    with open(os.path.join(components_amel_dir, comp), 'r', encoding='utf-8') as f:
        content_a = f.read()
    with open(os.path.join(components_nadia_dir, comp), 'r', encoding='utf-8') as f:
        content_n = f.read()
    
    if content_a != content_n:
        conflicts.append(comp)

print("Conflicts found:", conflicts)
