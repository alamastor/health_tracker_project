from fabric.contrib.files import exists
from fabric.api import env, run, local

REPO_URL = 'https://github.com/alamastor/health_tracker_project.git'

def deploy():
    site_dir = '~/sites/%s' % env.host
    _get_latest(site_dir)
    _do_build(site_dir)


def _get_latest(site_dir):
    if exists(site_dir + '/.git'):
        run('cd %s && git fetch' % site_dir)
    else:
        run('git clone %s %s' % (REPO_URL, site_dir))
    current_commit = local('git log -n 1 --format=%H', capture=True)
    run('cd %s && git reset --hard %s' % (site_dir, current_commit))


def _do_build(site_dir):
    run('cd %s && npm install' % site_dir)
    run('cd %s && bower install' % site_dir)
    run('cd %s && grunt build' % site_dir)
