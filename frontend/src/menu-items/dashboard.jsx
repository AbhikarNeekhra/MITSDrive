// assets
import { IconDashboard, IconFolder, IconTrash, IconBrandGoogleDrive, IconBuildingSkyscraper, IconUsers, IconVocabulary, IconUrgent, IconBulb, IconDots, IconScript, IconCategory } from '@tabler/icons';

let navigation
const type = localStorage.getItem('type');

if (type == '"admin"') {
  navigation = {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: IconDashboard,
        breadcrumbs: false
      },
      {
        id: 'File-Manager',
        title: 'File Manager',
        type: 'item',
        url: '/dashboard/filemanager',
        icon: IconFolder,
        breadcrumbs: false
      },
      {
        id: 'Shared-with-me',
        title: 'Shared with me',
        type: 'item',
        url: '/dashboard/shared',
        icon: IconBrandGoogleDrive,
        breadcrumbs: false
      },
      {
        id: 'category',
        title: 'Category',
        type: 'collapse',
        icon: IconCategory,
        breadcrumbs: true,
        children: [
          {
            id: 'notices',
            title: 'Notices',
            type: 'item',
            url: '/dashboard/notices',
            icon: IconUrgent,
            breadcrumbs: false
          },
          {
            id: 'study-material',
            title: 'Study Material',
            type: 'item',
            url: '/dashboard/study',
            icon: IconVocabulary,
            breadcrumbs: false
          },
          {
            id: 'curriculum',
            title: 'Curriculum',
            type: 'item',
            url: '/dashboard/curriculum',
            icon: IconScript,
            breadcrumbs: false
          },
          {
            id: 'activity',
            title: 'Activity',
            type: 'item',
            url: '/dashboard/activity',
            icon: IconBulb,
            breadcrumbs: false
          },
          {
            id: 'others',
            title: 'Others',
            type: 'item',
            url: '/dashboard/others',
            icon: IconDots,
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'Bin',
        title: 'Bin',
        type: 'item',
        url: '/dashboard/bin',
        icon: IconTrash,
        breadcrumbs: false
      },
      {
        id: 'Departments',
        title: 'Departments',
        type: 'item',
        url: '/dashboard/departments',
        icon: IconBuildingSkyscraper,
        breadcrumbs: false
      },
      {
        id: 'Faculties',
        title: 'Faculties',
        type: 'item',
        url: '/dashboard/faculties',
        icon: IconUsers,
        breadcrumbs: false
      },

    ]
  };
}
else if (type == '"faculty"' || type == '"department"') {
  navigation = {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: IconDashboard,
        breadcrumbs: false
      },
      {
        id: 'File-Manager',
        title: 'File Manager',
        type: 'item',
        url: '/dashboard/filemanager',
        icon: IconFolder,
        breadcrumbs: false
      },
      {
        id: 'Shared-with-me',
        title: 'Shared with me',
        type: 'item',
        url: '/dashboard/shared',
        icon: IconBrandGoogleDrive,
        breadcrumbs: false
      },
      {
        id: 'category',
        title: 'Category',
        type: 'collapse',
        icon: IconCategory,
        breadcrumbs: true,
        children: [
          {
            id: 'notices',
            title: 'Notices',
            type: 'item',
            url: '/dashboard/notices',
            icon: IconUrgent,
            breadcrumbs: false
          },
          {
            id: 'study-material',
            title: 'Study Material',
            type: 'item',
            url: '/dashboard/study',
            icon: IconVocabulary,
            breadcrumbs: false
          },
          {
            id: 'curriculum',
            title: 'Curriculum',
            type: 'item',
            url: '/dashboard/curriculum',
            icon: IconScript,
            breadcrumbs: false
          },
          {
            id: 'activity',
            title: 'Activity',
            type: 'item',
            url: '/dashboard/activity',
            icon: IconBulb,
            breadcrumbs: false
          },
          {
            id: 'others',
            title: 'Others',
            type: 'item',
            url: '/dashboard/others',
            icon: IconDots,
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'Bin',
        title: 'Bin',
        type: 'item',
        url: '/dashboard/bin',
        icon: IconTrash,
        breadcrumbs: false
      },
    ]
  };
}
else {
  navigation = {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: IconDashboard,
        breadcrumbs: false
      },
      {
        id: 'Shared-with-me',
        title: 'Shared with me',
        type: 'item',
        url: '/dashboard/shared',
        icon: IconBrandGoogleDrive,
        breadcrumbs: false
      },
      {
        id: 'notices',
        title: 'Notices',
        type: 'item',
        url: '/dashboard/notices',
        icon: IconUrgent,
        breadcrumbs: false
      },
      {
        id: 'study-material',
        title: 'Study Material',
        type: 'item',
        url: '/dashboard/study',
        icon: IconVocabulary,
        breadcrumbs: false
      },
      {
        id: 'curriculum',
        title: 'Curriculum',
        type: 'item',
        url: '/dashboard/curriculum',
        icon: IconScript,
        breadcrumbs: false
      },
      {
        id: 'activity',
        title: 'Activity',
        type: 'item',
        url: '/dashboard/activity',
        icon: IconBulb,
        breadcrumbs: false
      },
      {
        id: 'others',
        title: 'Others',
        type: 'item',
        url: '/dashboard/others',
        icon: IconDots,
        breadcrumbs: false
      },
    ]
  };
}

export default navigation;
