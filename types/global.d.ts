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