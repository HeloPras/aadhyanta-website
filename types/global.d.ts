import {type icon} from 'lucide-react'

interface TeamMember {
  name: string;
  position: string;
  department: string;
  bio: string;
  experience: string;
  education: string;
  specialties: string[];
  initials: string;
  image?:string;
}


// article page types


 interface Article {
  id: string
  type: 'Blog' | 'Article' | 'Report'
  typeCls: string
  tag: string
  featured: boolean
  title: string
  excerpt: string
  author: string
  authorRole: string
  authorAvatar: string
  date: string
  readTime: string
  image: string
  content: Section[]
  relatedIds: string[]
}

 interface Section {
  kind: 'heading' | 'subheading' | 'paragraph' | 'quote' | 'bullets' | 'callout' | 'divider'
  text?: string
  items?: string[]
}


// portfolio page types

type Company = {
  id: string
  name: string
  sector: string
  sectorIcon: icon,
  fund: 'NOF I' | 'NOF II' | 'Simrik'
  // status: 'Active' | 'Advancing to Exit' | 'Follow-on'
  ipo:boolean,
  statusCls: string
  province: string
  year: string
  description: string
  tags: string[]
  impacts: string[]
  image: string
  imageFit?: 'cover' | 'contain'
  featured?: boolean
  logoPlaceholder: string
}