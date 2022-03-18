import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
  Menu, MenuButton, MenuList, MenuItem,
  MenuItemOption, MenuGroup, MenuOptionGroup,
  MenuDivider, Divider, useColorMode, HStack,
  Button, Text, Avatar, VStack, Spacer
} from '@chakra-ui/react'
import {
  AppLayout, TrendingList, Categories, RecentlyPlayed, Hero
} from '../components'
import {
  MdOutlineDashboard, MdPlaylistPlay, MdKeyboardArrowDown, MdMenu, MdOutlineClose,
  MdStackedBarChart, MdListAlt, MdFeaturedPlayList, MdOutlineSearch, MdChevronRight,
  MdBrightnessMedium, MdLanguage, MdLogout
} from 'react-icons/md'
import { useWallet } from 'use-wallet'
import useGlobal from '../hooks/useGlobal'

const data = [
  {
    listingId: 1,
    image: 'https://i1.sndcdn.com/artworks-38gNae8qY7Gti4D5-zRbpjw-t500x500.jpg',
    name: 'Enemy - Imagine Dragons feat JID',
    url: 'enemy_imagine_dragons.mp3',
    categories: ["Rock", "Alternative"],
    price: 0.13,
    usdPrice: 3000,
    edition: '13/100',
    listingType: 'auction',
    expiration: 89400,
    currency: {
      name: 'Bitcoin',
      symbol: 'BTC',
      decimal: '',
      logo: 'https://bitcoin.org/img/icons/opengraph.png?1644775669'
    },
    chain: {
      name: '0x1121231313',
      logo: 'https://bitcoin.org/img/icons/opengraph.png?1644775669'
    },
    user: {
      username: 'gabbylou',
      address: '',
      avatar: 'https://xircus.sfo3.cdn.digitaloceanspaces.com/xircuspunks/pm-slick-bayleaf.png?ts=1645430181'
    },
    collection: [
      {
        name: 'gabbylou',
        image: 'https://xircus.sfo3.cdn.digitaloceanspaces.com/xircuspunks/pm-slick-bayleaf.png?ts=1645430181'
      },
    ]
  },
  {
    listingId: 2,
    image: 'https://upload.wikimedia.org/wikipedia/en/8/84/Fake_Love_%28Rocking_Vibe_Mix%29_Cover_Art.jpg',
    name: 'Fake Love - BTS',
    url: 'fake_love_BTS.mp3',
    categories: ["Pop"],
    price: 0.26,
    usdPrice: 3000,
    edition: '13/100',
    listingType: 'direct',
    expiration: 0,
    currency: {
      name: 'Polygon',
      symbol: 'MATIC',
      decimal: '',
      logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png'
    },
    chain: {
      name: '0x1121231313',
      logo: 'https://bitcoin.org/img/icons/opengraph.png?1644775669'
    },
    user: {
      username: 'gabbylou',
      avatar: 'https://xircus.sfo3.cdn.digitaloceanspaces.com/xircuspunks/pm-slick-bayleaf.png?ts=1645430181'
    },
    collection: {
      name: 'gabbylou',
      address: '',
      image: 'https://xircus.sfo3.cdn.digitaloceanspaces.com/xircuspunks/pm-slick-bayleaf.png?ts=1645430181'
    }
  }
]

const categories = [
  { name: 'Rock', category: 'rock', image: 'https://media.istockphoto.com/photos/two-young-adults-making-dabbing-movement-against-a-black-bricks-wall-picture-id1213297888?b=1&k=20&m=1213297888&s=170667a&w=0&h=j2H0J_zbOfoULU5g6LSvKfEg307C68I3S5RfOsCvP78=' },
  { name: 'RnB', category: 'rnb', image: 'https://images.unsplash.com/photo-1524088484081-4ca7e08e3e19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2FkJTIwc29uZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60' },
  { name: 'Pop', category: 'pop', image: 'https://media.istockphoto.com/photos/woman-singing-with-microphone-picture-id579761778?k=20&m=579761778&s=612x612&w=0&h=oKmS71vM_W3MIGFEy_bqOzmEr5z8Ds4VX6E2gcZarCA=' },
  { name: 'Soul', category: 'soul', image: 'https://media.istockphoto.com/photos/young-beautiful-woman-playing-piano-at-home-picture-id1306314969?b=1&k=20&m=1306314969&s=170667a&w=0&h=Rg97QtwmYUYw3YQnc2Z1ISySJ4rOIz6zbrvccKDUQ5U=' },
  { name: 'Acoustic', category: 'acoustic', image: 'https://media.istockphoto.com/photos/guy-jamming-acoustic-guitar-with-piano-player-background-picture-id886429698?b=1&k=20&m=886429698&s=170667a&w=0&h=tFJz3V5jgx2iqeB5pHvjN6XUemCOJgHXlHiAoCB63HA=' },
  { name: 'Alternative', category: 'alternative', image: 'https://images.unsplash.com/photo-1569845756567-fd54e7ebb649?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cG9wJTIwc29uZ3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' },
  { name: 'Techno', category: 'techno', image: 'https://images.unsplash.com/photo-1594623930572-300a3011d9ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaG5vfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60' }
]

const users = [
  {
    name: 'Gabriel Lou',
    avatar: 'https://xircus.sfo3.cdn.digitaloceanspaces.com/xircuspunks/pm-slick-bayleaf.png?ts=1645430181',
    image: 'https://images.unsplash.com/photo-1586902197503-e71026292412?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
    address: '0x1798371098372190823710',
    totalSales: '3000'
  },
  {
    name: 'Gabriel Lou',
    avatar: 'https://xircus.sfo3.cdn.digitaloceanspaces.com/xircuspunks/pm-slick-bayleaf.png?ts=1645430181',
    image: 'https://images.unsplash.com/photo-1586902197503-e71026292412?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
    address: '0x1798371098372190823710',
    totalSales: '3000'
  },
  {
    name: 'Gabriel Lou',
    avatar: 'https://xircus.sfo3.cdn.digitaloceanspaces.com/xircuspunks/pm-slick-bayleaf.png?ts=1645430181',
    image: 'https://images.unsplash.com/photo-1586902197503-e71026292412?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
    address: '0x1798371098372190823710',
    totalSales: '3000'
  },
  {
    name: 'Gabriel Lou',
    avatar: 'https://xircus.sfo3.cdn.digitaloceanspaces.com/xircuspunks/pm-slick-bayleaf.png?ts=1645430181',
    image: 'https://images.unsplash.com/photo-1586902197503-e71026292412?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
    address: '0x1798371098372190823710',
    totalSales: '3000'
  },
]

export default function Home() {
  const [state, actions] = useGlobal([])
  const { colorMode, toggleColorMode } = useColorMode()
  const wallet = useWallet()
  
  return (
    <AppLayout>
      <Hero/>
      <Categories categories={categories} colorMode={colorMode} />
      <TrendingList colorMode={colorMode} data={data} />
      <RecentlyPlayed colorMode={colorMode} data={data} />
    </AppLayout>
  )
}
