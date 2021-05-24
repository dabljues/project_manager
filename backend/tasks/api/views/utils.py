def generate_task_id(project_tasks, project_sub_tasks):
    latest_task_id = _get_latest_task_id(project_tasks)
    latetst_sub_task_id = _get_latest_task_id(project_sub_tasks)

    return max(latest_task_id, latetst_sub_task_id)


def _get_latest_task_id(project_tasks):
    if not project_tasks:
        return 1
    latest_task_name = project_tasks.last().name
    latest_task_id_in_project = int(latest_task_name.split("-")[-1])
    return latest_task_id_in_project + 1
