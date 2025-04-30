import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ethAddress = searchParams.get('eth_address');
    const starknetAddress = searchParams.get('starknet_address');
    
    if (!ethAddress && !starknetAddress) {
      return NextResponse.json(
        { error: 'Either Ethereum or Starknet address is required' },
        { status: 400 }
      );
    }

    const user = await sql`
      SELECT * FROM users 
      WHERE eth_address = ${ethAddress}
      OR starknet_address = ${starknetAddress}
    `;

    if (user.rows.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(user.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { eth_address, starknet_address } = await request.json();
    
    if (!eth_address || !starknet_address) {
      return NextResponse.json(
        { error: 'Both Ethereum and Starknet addresses are required' },
        { status: 400 }
      );
    }

    // Check if either address is already registered
    const existingUser = await sql`
      SELECT * FROM users 
      WHERE eth_address = ${eth_address}
      OR starknet_address = ${starknet_address}
    `;

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'One or both addresses already registered' },
        { status: 409 }
      );
    }

    const result = await sql`
      INSERT INTO users (
        eth_address, 
        starknet_address, 
        created_at,
        is_registered
      )
      VALUES (
        ${eth_address}, 
        ${starknet_address}, 
        NOW(),
        true
      )
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}