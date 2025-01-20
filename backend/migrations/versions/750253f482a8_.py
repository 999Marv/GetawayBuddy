"""empty message

Revision ID: 750253f482a8
Revises: fef5b2aa3a5d
Create Date: 2025-01-19 23:10:33.057522

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '750253f482a8'
down_revision = 'fef5b2aa3a5d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('clerk_id', sa.String(length=255), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('clerk_id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('itineraries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=126), nullable=False),
    sa.Column('activity', sa.JSON(), nullable=False),
    sa.Column('saved', sa.Boolean(), nullable=True),
    sa.Column('start_date', sa.DateTime(), nullable=True),
    sa.Column('end_date', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('itineraries')
    op.drop_table('users')
    # ### end Alembic commands ###
