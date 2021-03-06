from setuptools import setup, find_packages

install_requires = [
    "django>=3.2.5",
    "django-cors-headers>=3.7.0",
    "djangorestframework>=3.12.4",
    "djangorestframework-simplejwt>=4.7.2",
    "pillow>=8.3.1",
    "psycopg2>=2.9.1",
]
typing_requires = [
    "mypy>=0.910",
]
style_requires = [
    "black>=21.6b0",
    "flake8>=3.9.2",
    "isort>=3.9.2",
]
tests_requires = ["pytest"]
dev_requires = tests_requires + style_requires + typing_requires

version_file_template = """# coding: utf-8
# file generated by setuptools_scm
# don't change, don't track in version control
__version__ = "{version}"
"""

setup(
    name="backend",
    description="A backend application for Project Manager",
    url="https://github.com/dabljues/project_manager",
    install_requires=install_requires,
    use_scm_version={
        "root": "..",
        "write_to": "./backend/version.py",
        "write_to_template": version_file_template,
    },
    setup_requires=["setuptools_scm"],
    packages=find_packages(exclude=("media")),
    extras_require={
        "dev": dev_requires,
        "tests": tests_requires,
        "style": style_requires,
        "typing": typing_requires,
    },
    include_package_data=True,
)
