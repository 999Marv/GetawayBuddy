from alembic import op
import sqlalchemy as sa

# Revision identifiers, used by Alembic
revision = 'df469c2f100f'
down_revision = 'cdbbc114e68f'
branch_labels = None
depends_on = None

def upgrade():
    # Drop the foreign key constraint from itineraries table first
    op.drop_constraint('itineraries_user_id_fkey', 'itineraries', type_='foreignkey')
    
    # Drop the user_id column from the itineraries table
    op.drop_column('itineraries', 'user_id')

    # Now drop the users table
    op.drop_table('users')

    # Add clerk_id column with string type
    op.add_column('itineraries', sa.Column('clerk_id', sa.String(255), nullable=False))

def downgrade():
    # Recreate the users table in case of rollback
    op.create_table('users',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('email', sa.String(), nullable=False, unique=True),
        sa.Column('clerk_id', sa.String(), nullable=False, unique=True),
    )

    # Re-add the user_id column in the itineraries table
    op.add_column('itineraries', sa.Column('user_id', sa.Integer(), nullable=True))

    # Re-add the foreign key constraint
    op.create_foreign_key('itineraries_user_id_fkey', 'itineraries', 'users', ['user_id'], ['id'])
    
    # Remove clerk_id column
    op.drop_column('itineraries', 'clerk_id')
